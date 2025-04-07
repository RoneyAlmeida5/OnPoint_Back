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
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Request() req) {
    const companyId = req.user.companyId;
    return this.productsService.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @Request() req,
  ): Promise<Product> {
    const companyId = Number(req.user.companyId);
    if (!companyId) {
      throw new Error('Company ID is missing in token');
    }
    return this.productsService.create(createProductDto, companyId);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Request() req,
  ): Promise<Product> {
    const companyId = Number(req.user.companyId);
    return this.productsService.update(id, updateProductDto, companyId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<void> {
    const companyId = Number(req.user.companyId);
    return this.productsService.delete(id, companyId);
  }
}
