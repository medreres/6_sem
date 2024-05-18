import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UserInstance } from '@/modules/user/types';

import { AuthService } from '../auth.service';
import { AuthConstants } from '../constants';
import { AuthErrors } from '../errors';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: AuthConstants.Email,
    });
  }

  async validate(email: string, password: string): Promise<UserInstance> {
    const user = await this.authService.validateUser({ email, password });

    if (!user) {
      throw new UnauthorizedException(AuthErrors.FAIL_SIGN_IN);
    }

    return user;
  }
}
