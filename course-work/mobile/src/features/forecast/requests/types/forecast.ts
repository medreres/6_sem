import {City, CurrentWeather, Daily, HourlyWeather} from './shared';

export type Forecast = {
  city: City;

  current: CurrentWeather;

  daily: Daily[];

  hourly: HourlyWeather;
};
