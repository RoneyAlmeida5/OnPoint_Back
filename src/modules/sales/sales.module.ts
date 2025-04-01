import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './sale.entity';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { Payment } from '../payments/payment.entity';
import { SaleProduct } from './sales_product.entity';
import { Company } from '../company/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sale,
      User,
      Product,
      Payment,
      SaleProduct,
      Company,
    ]),
  ],
  providers: [SalesService, AuthGuard, JwtService],
  controllers: [SalesController], // Certifique-se de que o SalesController está aqui
  exports: [SalesService],
})
export class SalesModule {}
