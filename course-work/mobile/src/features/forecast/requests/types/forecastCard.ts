import {City, DailyWeatherForCard} from './shared';

export type ForecastCard = {
  city: City;

  daily: DailyWeatherForCard[];
};
