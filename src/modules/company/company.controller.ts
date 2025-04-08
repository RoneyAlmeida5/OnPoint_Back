import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  SetMetadata,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { UnauthorizedException } from '@nestjs/common';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('companies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.companyService.findAll();
  }

  // ROTA PARA RETORNAR DADOS DA EMPRESA LOGADA
  @Get('me')
  @Roles(Role.COMPANY_ADMIN)
  getMyCompany(@Request() req) {
    const { companyId, id } = req.user;

    if (!companyId) {
      throw new UnauthorizedException('Company ID não encontrado no token');
    }

    if (id === 1) {
      return { message: 'Admin logado. Não possui empresa específica.' };
    }

    return this.companyService.findOne(companyId);
  }

  // ROTA PARA LISTAR OS USUARIOS DA EMPRESA LOGADA
  @Get('my-users')
  @Roles(Role.COMPANY_ADMIN, Role.ADMIN)
  async getMyUsers(@Request() req) {
    const { id, companyId, role } = req.user;

    if (id === 1) {
      return this.companyService.findAllUsers();
    }

    return this.companyService.findUsersByCompany(companyId);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: number) {
    return this.companyService.findOne(id);
  }

  @Post()
  @SetMetadata('isPublic', true)
  create(@Body() data: CreateCompanyDto): Promise<Company> {
    return this.companyService.create(data);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: number, @Body() data: any) {
    return this.companyService.update(id, data);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: number): Promise<void> {
    await this.companyService.removeWithUsers(id);
  }
}
