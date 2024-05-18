import { compare, hash } from 'bcrypt';

import { CreateUser, User, UserInstance } from '@/modules/user/types';
import { City } from '@/modules/weather/city/types';
import { ResponseWithError } from '@/shared/types';

import { mockUsers } from '../data/db.mock';

const users: User[] = mockUsers;

export const mockUserModel = {
  async getUserById(userId: number): Promise<ResponseWithError<UserInstance>> {
    const data = users.find((user) => user.id === userId);

    if (!data) {
      throw new Error();
    }

    const user = this.createUserInstance(data);
    return {
      data: user,
    };
  },

  async create(_data: CreateUser): Promise<ResponseWithError<UserInstance>> {
    throw new Error('Not implemented');
  },

  async getUserByEmail(
    _email: string,
  ): Promise<ResponseWithError<UserInstance>> {
    throw new Error('Not implemented');
  },
  createUserInstance(user: User): UserInstance {
    const mockUser = users.find((data) => data.id === user.id)!;

    return {
      ...user,
      addCity: async (cityAddress: string): Promise<City[]> => {
        mockUser.cities.push({
          address: cityAddress,
          lat: 1,
          lon: 1,
          name: cityAddress,
        });

        return mockUser.cities;
      },
      removeCity: async (cityAddress: string): Promise<City[]> => {
        const index = mockUser.cities.findIndex(
          (city) => city.address === cityAddress,
        )!;

        mockUser.cities.splice(index, 1);

        return mockUser.cities;
      },
      canAddCity: function (cityName: string) {
        if (this.hasCity(cityName)) {
          return { error: 'City already in list' };
        }

        if (user.cities.length >= 10) {
          return {
            error:
              'Limit of cities reached. Remove several to continue adding.',
          };
        }

        return {
          data: true,
        };
      },
      canRemoveCity: function (cityName: string) {
        if (!this.hasCity(cityName)) {
          return { error: 'City is not in the list.' };
        }

        return {
          data: true,
        };
      },
      hasCity: (cityAddress: string): boolean => {
        return user.cities.some((city) => city.address === cityAddress);
      },
      updateRefreshToken: async (refreshToken?: string) => {
        const newRefreshToken = refreshToken
          ? await hash(refreshToken, 10)
          : '';

        mockUser.hashedRefreshToken = newRefreshToken;

        return;
      },
      passwordMatches: async (password: string): Promise<boolean> => {
        const passwordMatches = await compare(password, user.password);

        return passwordMatches;
      },
    };
  },
};
