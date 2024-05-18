import joi from 'joi';

export type Env = {
  NODE_ENV: 'development' | 'production';
  PORT: number;
  POSTGRES_DB: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_URL: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REFRESH_TOKEN_SECRET: string;
  ACCESS_TOKEN_SECRET: string;
  OPEN_WEATHER_API_TOKEN: string;
  GOOGLE_API_TOKEN: string;
};

export const envSchema = joi.object<Env, true>({
  NODE_ENV: joi.string().required().valid('development', 'production'),
  PORT: joi.number().min(0).required(),

  POSTGRES_DB: joi.string().required(),
  POSTGRES_USER: joi.string().required(),
  POSTGRES_PASSWORD: joi.string().required(),
  POSTGRES_URL: joi.string().required(),

  REDIS_HOST: joi.string().required(),
  REDIS_PORT: joi.number().min(0).required(),
  REFRESH_TOKEN_SECRET: joi.string().required(),
  ACCESS_TOKEN_SECRET: joi.string().required(),

  OPEN_WEATHER_API_TOKEN: joi.string().required(),

  GOOGLE_API_TOKEN: joi.string().required(),
});
