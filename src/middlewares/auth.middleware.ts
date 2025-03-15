import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../modules/users/users.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const tokenParts = authHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      throw new UnauthorizedException('Formato do token inválido');
    }

    const token = tokenParts[1];

    try {
      const decoded: any = jwt.verify(token, 'secretKey');
      const user = await this.usersService.findOne(decoded.userId);

      if (!user || user.user_blocked) {
        throw new UnauthorizedException('Usuário inválido ou bloqueado');
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Erro na verificação do token:', error);
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
