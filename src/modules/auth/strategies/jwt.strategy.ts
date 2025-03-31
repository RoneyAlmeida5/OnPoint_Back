// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'xFiEjr0GjS8Q', // mesmo segredo usado na geração do token
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.username,
      role: payload.role,
      companyId: payload.companyId, // ✅ GARANTE QUE companyId estará disponível em req.user
    };
  }
}
