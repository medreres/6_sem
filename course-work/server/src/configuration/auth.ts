import { Env } from './schema';

interface AuthRaw {
  ACCESS_TOKEN_DURATION: number;
  REFRESH_TOKEN_DURATION: number;
  SALT_ROUNDS: number;
}

export interface Auth extends AuthRaw, Env {}

export const auth = (): AuthRaw => ({
  ACCESS_TOKEN_DURATION: 1000 * 60 * 30,
  REFRESH_TOKEN_DURATION: 1000 * 60 * 60 * 24 * 7,
  SALT_ROUNDS: 10,
});
