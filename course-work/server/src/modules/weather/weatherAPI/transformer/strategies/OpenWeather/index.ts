import { CityWithCoordinates } from '@/shared';

import {
  CurrentForecast,
  DailyForecast,
  Forecast,
  HourlyForecast,
  Temperature,
  Weather,
} from '../../../../dto';
import { Params, TransformerStrategy } from '../../types';

import { OpenWeather } from './types';

export * from './types';

export class OpenWeatherStrategy implements TransformerStrategy {
  transform(data: OpenWeather, params?: Params): Forecast {
    const city: CityWithCoordinates = {
      name: params?.name || '',
      address: params?.address || '',
      lat: params?.lat || 0,
      lon: params?.lon || 0,
    };

    const daily = getForecastDaily(data);

    const hourly = getForecastHourly(data);

    const current = getForecastCurrent(data);

    const dataTransformed: Forecast = {
      city,
      daily,
      hourly,
      current,
    };

    return dataTransformed;
  }
}

const getForecastDaily = (data: OpenWeather): DailyForecast[] => {
  const dataFormatted = data.daily.map((data) => {
    const humidity = data.humidity;
    const timestamp = new Date(data.dt * 1000).toString();

    const { max, min, day, night } = data.temp;
    const temperature: Temperature = {
      max,
      min,
      day,
      night,
    };

    const weather: Weather[] = data.weather.map((data) => {
      return {
        id: data.id,
        main: data.main,
        description: data.description,
        icon: data.icon,
      };
    });

    return {
      timestamp,
      temperature,
      humidity,
      weather,
      sunrise: new Date(data.sunrise * 1000).toString(),
      sunset: new Date(data.sunset * 1000).toString(),
      windSpeed: data.wind_speed,
      precipitation: data.pop,
      uvi: data.uvi,
    };
  });

  return dataFormatted;
};

const getForecastHourly = (data: OpenWeather): HourlyForecast[] => {
  return data.hourly.map((data) => {
    return {
      timestamp: new Date(data.dt * 1000).toString(),
      temperature: data.temp,
      humidity: data.humidity,
      weather: data.weather,
    };
  });
};

const getForecastCurrent = ({ current }: OpenWeather): CurrentForecast => {
  return {
    feelsLike: current.feels_like,
    humidity: current.humidity,
    timestamp: new Date(current.dt * 1000).toString(),
    weather: current.weather,
  };
};
