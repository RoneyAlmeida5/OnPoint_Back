import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { Company } from '../company/company.entity';
import { AuthGuard } from '../auth/auth.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Company, User])],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, Reflector, JwtService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
