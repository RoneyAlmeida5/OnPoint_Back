// Exemplo de auth.controller.ts
import { Controller, Post, Body, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @SetMetadata('isPublic', true) // Marca a rota como pública
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return await this.authService.login(loginDto);
  }
}
