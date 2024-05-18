import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { accessToken, mockUserService } from '@/shared/__mocks__';

import { JwtGuard } from '../auth/guards';
import { DbService } from '../db/db.service';
import { GeocoderService } from '../geocoder/geocoder.service';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('User service', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtGuard,
        JwtService,
        UserResolver,
        UserService,
        GeocoderService,
        ConfigService,
        DbService,
      ],
    })
      .overrideProvider(DbService)
      .useValue({})
      .overrideProvider(GeocoderService)
      .useValue({})
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  test('Mounts', async () => {
    expect(resolver).toBeDefined();
  });

  test('Me function is called', async () => {
    await resolver.me(accessToken);

    expect(mockUserService.me).toHaveBeenCalled();
  });

  test('AddCity function is called', async () => {
    await resolver.addCity({ cityName: 'lviv' }, accessToken);

    expect(mockUserService.addCity).toHaveBeenCalled();
  });

  test('RemoveCity function is called', async () => {
    await resolver.removeCity({ cityName: 'lviv' }, accessToken);

    expect(mockUserService.removeCity).toHaveBeenCalled();
  });
});
