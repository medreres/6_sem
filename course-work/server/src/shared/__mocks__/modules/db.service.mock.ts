import { CreateUser, User } from '@/modules/user/types';
import { City } from '@/modules/weather/city/types';

import { mockUsers } from '../data/db.mock';

const users: User[] = mockUsers;
const cities: City[] = [];
let userIndex = 1;

export const mockDbService = {
  user: {
    create: (params: { data: CreateUser }): User => {
      const user = {
        id: userIndex,
        email: params.data.email,
        password: params.data.password,
        createdAt: new Date(),
        updatedAt: new Date(),
        hashedRefreshToken: null,
        cities: [],
      };

      users.push(user);

      userIndex += 1;

      return user;
    },
    findFirst: (params: { where: { id?: number; email?: string } }) => {
      return users.find((user) => {
        if (params.where.id) {
          return user.id === params.where.id;
        }

        if (params.where.email) {
          return user.email === params.where.email;
        }
      });
    },

    update(params: {
      where: { email: string };
      data: {
        cities: {
          connect?: { address: string };
          disconnect?: {
            address: string;
          };
        };
      };
    }) {
      const user = this.findFirst({
        where: {
          email: params.where.email,
        },
      });

      if (params.data.cities.connect) {
        user?.cities.push({
          address: params.data.cities.connect.address,
          name: params.data.cities.connect.address,
          lat: 0,
          lon: 0,
        });
      }

      if (params.data.cities.disconnect) {
        user!.cities = user!.cities.filter(
          (city) => city.address !== params.data.cities.disconnect?.address,
        );
      }

      return user;
    },
  },
  city: {
    create: (params: { data: City }): City => {
      cities.push(params.data);

      return params.data;
    },
    findFirst: (params: { where: { address?: string } }) => {
      return cities.find((city) => {
        if (params.where.address) {
          return city.address === params.where.address;
        }
      });
    },
  },
};
