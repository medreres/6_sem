export interface WeatherApiParams {
  apiKey: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface FetchForecastParams extends Coordinates {
  name: string;
  address: string;
}
