import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express'; // Importando Request do express
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) {
      return true; // Permite acesso a rotas públicas
    }

    const request: Request = context.switchToHttp().getRequest(); // Tipando explicitamente como Request
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token não encontrado');
    }

    let payload;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: 'xFiEjr0GjS8Q', // Substitua pela sua chave secreta
      });
      request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    // Validação de companyId no token, quando necessário
    const companyId = payload.companyId;
    if (!companyId) {
      throw new UnauthorizedException('Company ID não encontrado no token');
    }

    // Se o role do usuário não tiver acesso, podemos retornar um Forbidden
    const role = payload.role;
    if (role === 'User' && request.originalUrl.includes('/companies')) {
      throw new ForbiddenException(
        'Usuário não tem permissão para acessar empresas',
      );
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
