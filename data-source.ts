import { DataSource } from 'typeorm';
import { Product } from './dist/modules/products/product.entity.js';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '1207',
  database: 'PDVs',
  entities: [Product],
  migrations: ['dist/migrations/*.js'],
  synchronize: false, // Importante: não use true em produção
});
