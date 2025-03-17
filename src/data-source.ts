import { DataSource } from 'typeorm';
/* import { Product } from './dist/modules/products/product.entity.js';
import { Sale } from './dist/modules/sales/sale.entity.js';
import { User } from './dist/modules/users/user.entity.js';
import { Payment } from './dist/modules/payments/payment.entity.js'; */

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '1207',
  database: 'PDVs',
  entities: [`/dist/**/*.entity{.js,.ts}`],
  migrations: ['dist/migrations/*.js'],
  synchronize: false, // Importante: não use true em produção
});
