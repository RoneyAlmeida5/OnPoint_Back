import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './sale.entity';
import { AuthGuard } from '../auth/auth.guard'; // ✅ Importando AuthGuard
import { JwtService } from '@nestjs/jwt'; // ✅ Necessário para validar o token

@Module({
  imports: [TypeOrmModule.forFeature([Sale])],
  providers: [SalesService, AuthGuard, JwtService], // ✅ Registrando o AuthGuard e JwtService
  controllers: [SalesController],
  exports: [SalesService],
})
export class SalesModule {}
