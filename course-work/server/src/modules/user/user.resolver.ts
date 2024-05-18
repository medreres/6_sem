import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser, InputArgs } from '@/shared';

import { Token } from '../auth/dto';
import { JwtGuard } from '../auth/guards';

import { WeatherInput } from './dto/input/weather.input';
import { Cities } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => Token)
  me(@CurrentUser() user: Token): Promise<Token> {
    return this.userService.me(user.id);
  }

  @Mutation(() => Cities)
  async addCity(
    @InputArgs({ type: () => WeatherInput }) { cityName }: WeatherInput,
    @CurrentUser() user: Token,
  ): Promise<Cities> {
    const cities = await this.userService.addCity(user.id, cityName);

    return {
      cities,
    };
  }

  @Mutation(() => Cities)
  async removeCity(
    @InputArgs({ type: () => WeatherInput }) { cityName }: WeatherInput,
    @CurrentUser() user: Token,
  ): Promise<Cities> {
    const cities = await this.userService.removeCity(user.id, cityName);

    return {
      cities,
    };
  }
}
