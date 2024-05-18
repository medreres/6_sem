import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards';

describe('User service', () => {
  let resolver: AuthResolver;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    refreshToken: jest.fn(),
    signTokens: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        AuthService,
        JwtGuard,
        JwtService,
        ConfigService,
      ],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  test('Mounts', async () => {
    expect(resolver).toBeDefined();
  });

  test('Login function is called', async () => {
    await resolver.login(null as any, null as any, null as any);

    expect(mockAuthService.login).toHaveBeenCalled();
  });

  test('Logout function is called', async () => {
    await resolver.logout(null as any, { id: 1 } as any);

    expect(mockAuthService.logout).toHaveBeenCalled();
  });

  test('Register function is called', async () => {
    await resolver.register(null as any, null as any);

    expect(mockAuthService.register).toHaveBeenCalled();
  });
});
