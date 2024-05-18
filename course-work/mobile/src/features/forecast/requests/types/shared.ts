export type City = {
  name: string;
  address: string;
};

export type HourlyWeather = {
  timestamp: string;
  temperature: number;
  humidity: number;
  weather: WeatherDescription;
}[];

export type TemperatureMain = {
  min: number;
  max: number;
};

export type DailyWeatherForCard = {
  temperature: TemperatureDaily;
  windSpeed: number;
  humidity: number;
  weather: WeatherDescription;
};

export type WeatherDescription = {
  icon: string;
  main: string;
}[];

export type CurrentWeather = {
  feelsLike: number;
  weather: WeatherDescription;
  humidity: number;
};

export type TemperatureDaily = TemperatureMain & {
  day: number;
  night: number;
};

export interface Daily extends DailyWeatherForCard {
  timestamp: string;
  temperature: TemperatureDaily;
  weather: WeatherDescription;
  precipitation: number;
  humidity: number;
  sunrise: string;
  sunset: string;
  uvi: number;
  windSpeed: number;
}
