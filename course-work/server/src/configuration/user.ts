import { Env } from './schema';

interface UserRaw {
  WEATHER_CARDS_LIMIT: number;
}

export interface User extends UserRaw, Env {}

export const user = (): UserRaw => ({
  WEATHER_CARDS_LIMIT: 10,
});
