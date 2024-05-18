import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { JwtGuard } from '../auth/guards';
import { CityInput } from '../geocoder/dto';

import { WeatherResolver } from './weather.resolver';
import { WeatherService } from './weather.service';

describe('User service', () => {
  let resolver: WeatherResolver;

  const mockWeatherService = {
    getForecast: jest.fn(),
    getForecasts: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherResolver,
        JwtGuard,
        JwtService,
        WeatherService,
        ConfigService,
      ],
    })
      .overrideProvider(WeatherService)
      .useValue(mockWeatherService)
      .compile();

    resolver = module.get<WeatherResolver>(WeatherResolver);
  });

  test('Mounts', async () => {
    expect(resolver).toBeDefined();
  });

  test('getForecast function is called', async () => {
    await resolver.forecast({ cityName: 'lviv' });

    expect(mockWeatherService.getForecast).toHaveBeenCalled();
  });

  test('getForecasts function is called', async () => {
    const cities: CityInput[] = [{ cityName: 'lviv' }, { cityName: 'sambir' }];

    await resolver.forecasts(cities);

    expect(mockWeatherService.getForecasts).toHaveBeenCalledTimes(1);
  });
});
