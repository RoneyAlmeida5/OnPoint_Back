import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module'; // Importe UsersModule
import { JwtStrategy } from './strategies/jwt.strategy'; // IMPORTANTE: Importe o JwtStrategy

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule, // Adicione UsersModule aqui
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // ADICIONADO: Registrando o JwtStrategy aqui
  exports: [JwtModule],
})
export class AuthModule {}
