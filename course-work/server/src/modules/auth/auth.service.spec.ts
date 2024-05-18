import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { mockConfigService, mockDbService } from '@/shared/__mocks__';

import { DbService } from '../db/db.service';
import { UserService } from '../user/user.service';

import { AuthService } from './auth.service';

describe('User service', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        ConfigService,
        UserService,
        DbService,
      ],
    })
      .overrideProvider(DbService)
      .useValue(mockDbService)
      .overrideProvider(UserService)
      .useValue({})
      .overrideProvider(ConfigService)
      .useValue(mockConfigService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  test('Mounts', async () => {
    expect(service).toBeDefined();
  });

  // TODO
  //   test('Registers new user', async () => {
  //     const user = await service.register(null as any, mockUsers[0]);

  //     console.log(user);

  //     expect(user).toBeDefined();
  //   });
});
