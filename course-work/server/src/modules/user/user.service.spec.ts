import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { mockDbService, mockGeocoderService } from '@/shared/__mocks__';

import { DbService } from '../db/db.service';
import { GeocoderService } from '../geocoder/geocoder.service';

import { UserService } from './user.service';

describe('User service', () => {
  let service: UserService;
  const cityName = 'lviv';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, GeocoderService, ConfigService, DbService],
    })
      .overrideProvider(DbService)
      .useValue(mockDbService)
      .overrideProvider(GeocoderService)
      .useValue(mockGeocoderService)
      .compile();

    service = module.get<UserService>(UserService);
  });

  test('Mounts', async () => {
    expect(service).toBeDefined();
  });

  describe('Me', () => {
    test('Returns user', async () => {
      const user = await service.me(1);

      expect(user).toBeDefined();
    });

    test('Throws error on undefined user', async () => {
      const user = async () => service.me(123123);

      expect(user).rejects.toThrowError();
    });
  });

  test('Adds city', async () => {
    const user = await service.me(1);

    await service.addCity(1, cityName);

    const city = user.cities.find((city) => city.address === cityName);

    expect(city).toBeDefined();
  });

  test('Removes city', async () => {
    const user = await service.me(1);

    const cities = await service.removeCity(1, cityName);

    const city = cities.find((city) => city === cityName);

    expect(city).not.toBeDefined();
  });
});
