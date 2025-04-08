import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '1207',
  database: 'PDVs',
  entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
  synchronize: true,
  connectTimeout: 10000,
};
