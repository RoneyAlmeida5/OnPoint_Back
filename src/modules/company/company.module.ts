import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Product } from '../products/product.entity';
import { Sale } from '../sales/sale.entity';
import { Payment } from '../payments/payment.entity';
import { SaleProduct } from '../sales/sales_product.entity';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, Product, Sale, Payment, SaleProduct]),
    UsersModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
