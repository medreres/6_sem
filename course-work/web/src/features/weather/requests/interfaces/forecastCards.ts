import { City, CurrentWeather, DailyWeatherForCard } from "./shared";

export type ForecastCard = {
  city: City;

  current: CurrentWeather;

  daily: DailyWeatherForCard[];
};

export type ForecastCards = ForecastCard[];
