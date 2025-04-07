import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { Payment } from '../payments/payment.entity';
import { SaleProduct } from './sales_product.entity';
import { Company } from '../company/company.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private readonly salesRepository: Repository<Sale>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(SaleProduct)
    private readonly salesProductRepository: Repository<SaleProduct>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async findAll(user: any): Promise<Sale[]> {
    const isAdmin = user?.sub === 1 && user?.companyId === 1;

    const whereClause = isAdmin
      ? {} // Admin vê tudo
      : { company: { id: user.companyId } }; // Demais usuários veem apenas da própria empresa

    return this.salesRepository.find({
      where: whereClause,
      relations: [
        'user',
        'payment',
        'salesProducts',
        'salesProducts.product',
        'company',
      ],
    });
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
    companyId: number, // O companyId agora vem do JWT
  ): Promise<Sale[]> {
    // Buscar o usuário e pagamento
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
    });

    if (!user || !payment) {
      throw new Error('Usuário ou pagamento inválido.');
    }

    // Buscar a empresa usando companyId do JWT
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!company) {
      throw new Error('Empresa não encontrada.');
    }

    // Criar a venda
    const sale = new Sale();
    sale.user = user;
    sale.payment = payment;
    sale.date_sale = new Date();
    sale.company = company; // A empresa associada

    // Salvar a venda
    const savedSale = await this.salesRepository.save(sale);

    // Criar os produtos da venda
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
      salesProduct.company = company; // Associando a empresa diretamente

      await this.salesProductRepository.save(salesProduct);
    }

    return [savedSale];
  }
}
