import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './sale.entity';
import { AuthGuard } from '../auth/auth.guard'; // ✅ Importando o AuthGuard

@UseGuards(AuthGuard) // ✅ Aplica o guard a todas as rotas
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  findAll(@Request() req): Promise<Sale[]> {
    console.log('Usuário autenticado:', req.user);
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Request() req): Promise<Sale> {
    console.log('Usuário autenticado:', req.user);
    return this.salesService.findOne(id);
  }

  @Post()
  create(@Body() createSaleDto: CreateSaleDto, @Request() req): Promise<Sale> {
    console.log('Usuário autenticado:', req.user);
    return this.salesService.create(createSaleDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateSaleDto: UpdateSaleDto,
    @Request() req,
  ) {
    console.log('Usuário autenticado:', req.user);
    return this.salesService.update(id, updateSaleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Request() req) {
    console.log('Usuário autenticado:', req.user);
    return this.salesService.delete(id);
  }
}
