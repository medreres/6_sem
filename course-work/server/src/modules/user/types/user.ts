import { Prisma } from '@prisma/client';

import { City } from '@/modules/weather/city/types';
import { ResponseWithError } from '@/shared';

export type User = Prisma.UserGetPayload<{
  include: { cities: true };
}>;

export interface UserInstance extends User {
  addCity(cityAddress: string): Promise<City[]>;
  removeCity(cityName: string): Promise<City[]>;

  updateRefreshToken(refreshToken?: string): Promise<void>;
  passwordMatches: (password: string) => Promise<boolean>;

  canAddCity(cityName: string): ResponseWithError<boolean>;
  canRemoveCity(cityName: string): ResponseWithError<boolean>;
  hasCity(cityName: string): boolean;
}

export type CreateUser = Pick<User, 'email' | 'password'>;
