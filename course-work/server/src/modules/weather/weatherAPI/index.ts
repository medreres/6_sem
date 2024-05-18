import axios, { AxiosInstance } from 'axios';

import { Forecast } from '../dto';

import { BASE_URL } from './constants';
import { Endpoints } from './endpoints';
import { OpenWeatherStrategy, WeatherTransformer } from './transformer';
import { FetchForecastParams, WeatherApiParams } from './types';

export class WeatherApi {
  private readonly weatherAPI: AxiosInstance;
  private readonly transformer: WeatherTransformer;

  constructor(params: WeatherApiParams) {
    this.weatherAPI = axios.create({
      baseURL: BASE_URL,
      params: {
        appId: params.apiKey,
      },
    });
    this.transformer = new WeatherTransformer(new OpenWeatherStrategy());
  }

  async fetchForecast({
    lat,
    lon,
    address,
    name,
  }: FetchForecastParams): Promise<Forecast> {
    let response: any;
    try {
      const { data: weather } = await this.weatherAPI({
        url: Endpoints.dailyForecast,
        method: 'GET',
        params: {
          lat,
          lon,
          units: 'metric',
        },
      });
      response = weather;
    } catch (error: any) {
      throw new Error(error);
    }

    const weatherTransformed = this.transformer.transform(response, {
      name,
      address,
      lat,
      lon,
    });

    return weatherTransformed;
  }
}
