import { Env } from './schema';

interface WeatherRaw {
  WEATHER_CACHED_PREFIX: string;
  WEATHER_EXPIRATION: number;
}

export interface Weather extends WeatherRaw, Env {}

export const weather = (): WeatherRaw => ({
  WEATHER_CACHED_PREFIX: 'WEATHER_CACHED',
  WEATHER_EXPIRATION: 60 * 60 * 3, // 3 hours,
});
