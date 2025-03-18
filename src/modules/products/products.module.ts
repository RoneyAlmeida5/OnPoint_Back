import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { AuthModule } from '../auth/auth.module'; // Importa o módulo de autenticação para fornecer o AuthGuard

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule], // Adiciona o AuthModule
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], // Opcional: exporta o serviço se for usado em outros módulos
})
export class ProductsModule {}
