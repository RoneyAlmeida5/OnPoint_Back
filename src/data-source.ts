import { DataSource } from 'typeorm';
import { User } from '../src/modules/users/user.entity';
import { Company } from '../src/modules/company/company.entity';
import { Product } from '../src/modules/products/product.entity';
import { Sale } from '../src/modules/sales/sale.entity';
import { Payment } from '../src/modules/payments/payment.entity';
import { SaleProduct } from '../src/modules/sales/sales_product.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '1207',
  database: 'PDVs',
  entities: [User, Company, Product, Sale, Payment, SaleProduct],
  synchronize: false, // Importante: não use true em produção
});
