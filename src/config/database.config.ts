import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root', // substitua pelo seu usuário do banco de dados
  password: '1207', // substitua pela sua senha
  database: 'PDVs',
  entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
  synchronize: true, // Define como true durante o desenvolvimento
  connectTimeout: 10000,
};
