import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { Payment } from '../payments/payment.entity';
import { SaleProduct } from './sales_product.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly salesRepository: Repository<Sale>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(SaleProduct)
    private readonly salesProductRepository: Repository<SaleProduct>,
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

  async update(id: number, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    const existingSale = await this.findOne(id);
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

  async createSales(
    produtos: any[],
    userId: number,
    paymentId: number,
  ): Promise<Sale[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
    });

    if (!user || !payment) {
      throw new Error('Usuário ou pagamento inválido.');
    }

    const sale = new Sale();
    sale.user = user;
    sale.payment = payment;
    sale.date_sale = new Date();
    const savedSale = await this.salesRepository.save(sale);

    for (const produto of produtos) {
      const product = await this.productRepository.findOne({
        where: { uuid: produto.uuid },
      });

      if (!product) {
        throw new Error(`Produto com UUID ${produto.uuid} não encontrado.`);
      }

      const salesProduct = new SaleProduct();
      salesProduct.sale = savedSale;
      salesProduct.product = product;
      salesProduct.quantity = produto.quantity;
      await this.salesProductRepository.save(salesProduct);
    }

    return [savedSale];
  }
}
