import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly salesRepository: Repository<Sale>,
  ) {}

  async findAll(): Promise<Sale[]> {
    return this.salesRepository.find({ relations: ['product', 'payment'] });
  }

  async findOne(id: number): Promise<Sale> {
    return this.salesRepository.findOne({
      where: { id },
      relations: ['product', 'payment'],
    });
  }

  async create(sale: Partial<Sale>): Promise<Sale> {
    return this.salesRepository.save(sale);
  }

  async update(id: number, sale: Partial<Sale>): Promise<void> {
    await this.salesRepository.update(id, sale);
  }

  async delete(id: number): Promise<void> {
    await this.salesRepository.delete(id);
  }
}
