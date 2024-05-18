export type City = {
  name: string;
  address: string;
};

export type HourlyWeather = {
  timestamp: string;
  temperature: number;
}[];

export type DailyWeatherForCard = {
  windSpeed: number;
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

export type TemperatureDaily = {
  min: number;
  max: number;
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
}
