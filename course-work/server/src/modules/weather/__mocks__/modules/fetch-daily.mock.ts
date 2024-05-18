import { OpenWeather } from '../../weatherAPI/transformer';
import { response } from '..';

export const mockOpenWeatherService = {
  get: () => Promise.resolve(response as OpenWeather),
};
