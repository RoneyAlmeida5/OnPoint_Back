import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtAuthGuard extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'xFiEjr0GjS8Q',
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload);
    return {
      id: payload.sub,
      email: payload.username,
      role: payload.role,
      companyId: payload.companyId,
    };
  }
}
