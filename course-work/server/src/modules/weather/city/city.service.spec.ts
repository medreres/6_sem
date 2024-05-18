import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { DbService } from '@/modules/db/db.service';
import { mockCities, mockDbService } from '@/shared/__mocks__';

import { City, CityService } from './city.service';

describe('User service', () => {
  let service: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbService, CityService, ConfigService],
    })
      .overrideProvider(DbService)
      .useValue(mockDbService)
      .compile();

    service = module.get<CityService>(CityService);
  });

  test('Mounts', () => {
    expect(service).toBeDefined();
  });

  test('Creates a new city', async () => {
    const { data: city } = await service.create(mockCities[0]);

    expect(city).toEqual<City>({
      address: expect.any(String),
      lat: expect.any(Number),
      lon: expect.any(Number),
      name: expect.any(String),
    });
  });

  test('Finds city', async () => {
    const { data: city } = await service.getCityByAddress(
      mockCities[0].address,
    );

    expect(city).toBeDefined();
  });

  test('Returns error on invalid city', async () => {
    const { error, data } = await service.getCityByAddress('invalid');

    expect(data).not.toBeDefined();
    expect(error).toBeDefined();
  });
});
