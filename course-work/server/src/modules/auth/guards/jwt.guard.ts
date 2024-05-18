import {
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

import { Env } from '@/configuration';
import { AuthService } from '@/modules/auth/auth.service';
import { Token } from '@/modules/auth/dto';

import { AuthErrors } from '../errors';

export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(ConfigService) private readonly configService: ConfigService<Env>,
  ) {
    super();
  }

  /**
   * @description
   * Tries to authenticate user by access token
   * If access token is not available/valid
   * check the refresh token and try to refresh access token
   */
  async canActivate(context: ExecutionContext) {
    try {
      const canActivate = (await super.canActivate(context)) as boolean;

      return canActivate;
    } catch (error) {
      const refreshToken = this.getCookie('refreshToken', context);

      const token = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      }) as Token;

      if (!token) {
        throw new UnauthorizedException(AuthErrors.UNAUTHORIZED);
      }

      // assign user to access in further functions
      const ctx = GqlExecutionContext.create(context);
      ctx.getContext().req.user = token;

      // refresh tokens in db and cookies
      const res = this.getResponse(context);
      await this.authService.refreshToken(res, token.id, refreshToken);

      return true;
    }
  }

  // method for getting req object from graphql query
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  getResponse(context: ExecutionContext): Response {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().res;
  }

  getCookie(name: string, context: ExecutionContext): string {
    const req = this.getRequest(context);

    const cookie = req.cookies[name];

    return cookie;
  }
}
