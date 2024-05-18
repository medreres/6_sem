import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { Response as ExpressResponse } from 'express';

import { CurrentUser, InputArgs, Response } from '@/shared';

import { UserInstance } from '../user/types';

import { AuthService } from './auth.service';
import { Auth, GeneralResponse, Token } from './dto';
import { JwtGuard, LocalAuthGuard } from './guards';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => GeneralResponse)
  register(
    @Response() res: ExpressResponse,
    @InputArgs({ type: () => Auth }) input: Auth,
  ): Promise<GeneralResponse> {
    return this.authService.register(res, input);
  }

  @Mutation(() => GeneralResponse)
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: UserInstance,
    @Response() res: ExpressResponse,
    @InputArgs({ type: () => Auth }) _input: Auth,
  ): Promise<GeneralResponse> {
    return this.authService.login(res, user);
  }

  @Mutation(() => GeneralResponse)
  @UseGuards(JwtGuard)
  logout(
    @Response() res: ExpressResponse,
    @CurrentUser() { id }: Token, // TODO get is bad naming
  ): Promise<GeneralResponse> {
    return this.authService.logout(res, id);
  }
}
