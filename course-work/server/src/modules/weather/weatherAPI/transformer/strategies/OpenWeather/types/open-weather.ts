import { Coordinates } from '@/shared';

import { DailyForecast } from './daily-forecast';
import { HourlyForecast } from './hourly-forecast';
import { CurrentForecast } from '.';

export interface OpenWeather extends Coordinates {
  daily: DailyForecast[];

  hourly: HourlyForecast[];

  current: CurrentForecast;
}
