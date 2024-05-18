import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

import { Weather } from '@/configuration';

import { GeocoderService } from '../geocoder/geocoder.service';

import { CityService } from './city/city.service';
import { Forecast } from './dto';
import { WeatherApi } from './weatherAPI';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(GeocoderService.name);
  private readonly weatherApi: WeatherApi;

  constructor(
    private readonly configService: ConfigService<Weather, true>,
    private readonly cityService: CityService,
    private readonly geocoder: GeocoderService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    this.weatherApi = new WeatherApi({
      apiKey: configService.get('OPEN_WEATHER_API_TOKEN'),
    });
  }

  /**
   *
   * @param cityName
   * @description
   * search in cache city for name first
   * if not found then try to find in db
   *  if found
   *     get coordinates from db
   *     get forecast from openweather
   *     cache result and return it
   *  else
   *     find city in google places api
   *     save it to db with coordinates and address and name
   *     get forecast for the city from openweather
   *     cache and return it
   * else
   *  return forecast from cache
   * @returns
   */
  // TODO split
  async getForecast(cityName: string): Promise<Forecast> {
    const key = this.cacheKey(cityName);

    this.logger.log(`Searching for city ${cityName} in cache`);
    this.logger.debug(`Cache key: ${key}`);
    const weatherCached = await this.cacheManager.get<Forecast>(key);

    if (weatherCached) {
      this.logger.log(
        `City ${cityName} is found in cache! Retrieving forecast.`,
      );
      return weatherCached;
    }

    this.logger.debug(
      `City ${cityName} not found in cache. Trying to retrieve from coordinates db.`,
    );

    let { data: city } = await this.cityService.getCityByAddress(cityName);

    this.logger.debug(
      'City is not found in db. Trying to retrieve from geocoding api.',
    );

    if (!city) {
      const { error, data } = await this.geocoder.fetchAddress(cityName);

      if (error || !data) {
        this.logger.error(`City ${cityName} not found in geocoding api.`);
        throw new NotFoundException(`Cant find the city ${cityName}`);
      }

      city = data;

      this.logger.debug(
        'Fetched city coordinates from api. Saving to db. Response: %O',
        city,
      );
      await this.cityService.create(city);
    }

    const weather = await this.weatherApi.fetchForecast({
      lat: city.lat,
      lon: city.lon,
      address: city.address,
      name: city.name,
    });

    this.logger.debug('Forecast fetched! Formatting...');
    this.logger.verbose('Fetched forecast: %O', weather);

    // hourly weather every 3 hour
    const newCacheKey = this.cacheKey(city.address);
    await this.cacheManager.set(key, weather);

    this.logger.debug(`Saving forecast to cache under key`);
    this.logger.verbose(`Cache key ${newCacheKey}. Data: %O`, weather);
    this.logger.log(`Returning weather forecast for city ${cityName}`);

    return weather;
  }

  async getForecasts(cities: string[]): Promise<Forecast[]> {
    const weather = await Promise.all(
      cities.map((cityName) => this.getForecast(cityName)),
    );

    return weather;
  }

  private cacheKey(cityName: string) {
    return `${this.configService.get('WEATHER_CACHED_PREFIX')}.${cityName}`;
  }
}
