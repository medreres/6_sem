import { Auth } from '@/configuration';

export const mockConfigService = {
  // mock for SALT_ROUNDS
  get: (key: keyof Auth) => {
    switch (key) {
      case 'ACCESS_TOKEN_DURATION':
        return 5;

      case 'REFRESH_TOKEN_DURATION':
        return 5;

      case 'SALT_ROUNDS':
        return 5;

      case 'ACCESS_TOKEN_SECRET':
        return '123';

      case 'REFRESH_TOKEN_SECRET':
        return '12313';
    }
  },
};
