import { Temperature } from '@/modules/weather/dto';

import { SharedProperties } from './shared-properties';

export interface DailyForecast extends SharedProperties {
  temp: Temperature;
  sunrise: number;
  sunset: number;
  pop: number;
  uvi: number;
  wind_speed: number;
}
