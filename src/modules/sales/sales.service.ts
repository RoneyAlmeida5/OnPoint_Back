import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly salesRepository: Repository<Sale>,
  ) {}

  async findAll(): Promise<Sale[]> {
    return this.salesRepository.find();
  }

  async findOne(id: number): Promise<Sale> {
    const sale = await this.salesRepository.findOne({ where: { id } });

    if (!sale) {
      throw new Error(`Venda com ID ${id} não encontrada`);
    }

    return sale;
  }

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const sale = this.salesRepository.create({
      ...createSaleDto,
      date_sale: new Date(createSaleDto.date_sale), // ✅ Convertendo string para Date
    });

    return this.salesRepository.save(sale);
  }

  async update(id: number, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    const existingSale = await this.findOne(id); // ✅ Agora garantimos que não será null

    const updatedSale = {
      ...existingSale,
      ...updateSaleDto,
      date_sale: updateSaleDto.date_sale
        ? new Date(updateSaleDto.date_sale)
        : existingSale.date_sale,
    };

    await this.salesRepository.save(updatedSale);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.salesRepository.delete(id);
  }
}
