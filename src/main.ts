import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './modules/auth/auth.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001', // 🔹 Endereço do frontend
    credentials: true, // 🔹 Permite envio de cookies e headers de autenticação
  });

  app.useGlobalPipes(new ValidationPipe());

  // ✅ Obtendo dependências corretamente
  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);
  app.useGlobalGuards(new AuthGuard(jwtService, reflector)); // Ordem correta dos argumentos

  await app.listen(3000);
}
bootstrap();
