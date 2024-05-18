import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { Auth } from '@/configuration';

import { Token } from '../dto';
import { cookieExtractor } from '../utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(ConfigService) configService: ConfigService<Auth>) {
    super({
      jwtFromRequest: (req: Request) => cookieExtractor(req, 'accessToken'),
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(_req: Request, payload: Token) {
    return payload;
  }
}
