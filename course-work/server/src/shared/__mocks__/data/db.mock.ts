import { User } from '@/modules/user/types';
import { City } from '@/modules/weather/city/types';

export const mockCities: City[] = [
  {
    name: 'Sambir',
    address: 'Sambir',
    lat: 42,
    lon: 42,
  },
];

export const mockUsers: User[] = [
  {
    id: 1,
    email: 'test@test.com',
    cities: [mockCities[0]],
    createdAt: new Date(),
    hashedRefreshToken: null,
    password: 'asd',
    updatedAt: new Date(),
  },
  {
    id: 2,
    email: 'admin@admin.com',
    cities: [mockCities[0]],
    createdAt: new Date(),
    hashedRefreshToken: null,
    password: 'asd',
    updatedAt: new Date(),
  },
];
