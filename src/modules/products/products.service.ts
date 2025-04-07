import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    companyId: number,
  ): Promise<Product> {
    const product = this.productRepository.create({
      ...createProductDto,
      companyId: companyId,
    });
    return this.productRepository.save(product);
  }

  async findAll(companyId: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { companyId: companyId },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    companyId: number,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id, companyId: companyId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id); // ou return this.productRepository.findOne({ where: { id } });
  }

  async delete(id: number, companyId: number): Promise<void> {
    const result = await this.productRepository.delete({
      id,
      companyId: companyId,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
