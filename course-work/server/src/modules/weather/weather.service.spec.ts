import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { mockDbService, mockGeocoderService } from '@/shared/__mocks__';

import { DbService } from '../db/db.service';
import { GeocoderService } from '../geocoder/geocoder.service';

import { mockCacheManager } from './__mocks__/modules/cache-manager.mock';
import { CityService } from './city/city.service';
import { WeatherService } from './weather.service';

describe('User service', () => {
  let service: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
        ConfigService,
        DbService,
        CityService,
        WeatherService,
        WeatherService,
        GeocoderService,
      ],
    })
      .overrideProvider(DbService)
      .useValue(mockDbService)
      .overrideProvider(GeocoderService)
      .useValue(mockGeocoderService)
      .compile();

    service = module.get<WeatherService>(WeatherService);
  });

  test('Mounts', async () => {
    expect(service).toBeDefined();
  });
});
