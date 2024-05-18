import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';

import { User as UserConfig } from '@/configuration';
import { ResponseWithError } from '@/shared';

import { Token } from '../auth/dto';
import { DbService } from '../db/db.service';
import { GeocoderService } from '../geocoder/geocoder.service';
import { City } from '../weather/city/types';

import { CreateUser, User, UserInstance } from './types';

@Injectable()
export class UserService {
  private static WEATHER_CARDS_LIMIT: number;
  private readonly logger = new Logger(GeocoderService.name);

  constructor(
    private readonly geocoder: GeocoderService,
    private readonly dbService: DbService,
    private readonly configService: ConfigService<UserConfig, true>,
  ) {
    UserService.WEATHER_CARDS_LIMIT = this.configService.get<number>(
      'WEATHER_CARDS_LIMIT',
    )!;
  }

  async addCity(userId: number, cityName: string): Promise<string[]> {
    const { data: user } = await this.getUserById(userId);

    const { error: canAddCityError } = user!.canAddCity(cityName);

    if (canAddCityError) {
      throw new ForbiddenException(canAddCityError);
    }

    const address = await this.geocoder.fetchAddress(cityName);

    if (address.error) {
      this.logger.error(address.error);
      throw new NotFoundException(address.error);
    }

    this.logger.log('Updating user list of cities');
    const result = await user!.addCity(address.data!.address);
    this.logger.debug('Updated list of cities: %O', result);

    return result.map((city) => city.address);
  }

  async removeCity(userId: number, cityName: string): Promise<string[]> {
    const { data: user } = await this.getUserById(userId);

    this.logger.verbose('Checking if can remove city');
    const { error } = user!.canRemoveCity(cityName);

    if (error) {
      throw new ForbiddenException(error);
    }

    this.logger.log(`Deleting city ${cityName} from user's list`);
    const response = await user!.removeCity(cityName);

    return response.map((city) => city.address);
  }

  async me(userId: number): Promise<Token> {
    const user = await this.getUserById(userId);

    if (user.error || !user.data) {
      throw new NotFoundException();
    }

    return user.data;
  }

  async getUserByEmail(
    email: string,
  ): Promise<ResponseWithError<UserInstance>> {
    this.logger.log(`Searching for user with email - ${email}`);

    const user = await this.dbService.user.findFirst({
      where: { email: email },
      include: { cities: true },
    });

    if (!user) {
      return { error: 'User is not found' };
    }

    this.logger.verbose('User found!');
    this.logger.debug('Data: %O', user);

    const userInstance = this.createUserInstance(user);
    return { data: userInstance };
  }

  async getUserById(userId: number): Promise<ResponseWithError<UserInstance>> {
    this.logger.log(`Searching for user with id - ${userId}`);

    const user = await this.dbService.user.findFirst({
      where: { id: userId },
      include: { cities: true },
    });

    if (!user) {
      return {
        error: 'User not found',
      };
    }
    this.logger.verbose('User found!');
    this.logger.debug('Data: %O', user);

    const userInstance = this.createUserInstance(user);
    return { data: userInstance };
  }

  private createUserInstance(user: User): UserInstance {
    const logger = this.logger;

    return {
      ...user,
      addCity: async (cityAddress: string): Promise<City[]> => {
        const result = await this.dbService.user.update({
          where: {
            email: user.email,
          },
          data: {
            cities: {
              connect: {
                address: cityAddress,
              },
            },
          },
          select: {
            cities: true,
          },
        });

        return result.cities;
      },
      removeCity: async (cityAddress: string): Promise<City[]> => {
        const deleteResult = await this.dbService.user.update({
          where: {
            email: user.email,
          },
          data: {
            cities: {
              disconnect: {
                address: cityAddress,
              },
            },
          },
          select: {
            cities: true,
          },
        });

        return deleteResult.cities;
      },
      canAddCity: function (cityName: string) {
        if (this.hasCity(cityName)) {
          logger.error("City is already in user's list");
          return { error: 'City already in list' };
        }

        if (user.cities.length >= UserService.WEATHER_CARDS_LIMIT) {
          logger.error(
            'Limit of cities reached. Need to remove at least one to continue.',
          );
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
          logger.error("City is not in user's list");
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

        await this.dbService.user.update({
          where: {
            id: user.id,
          },
          data: {
            hashedRefreshToken: newRefreshToken,
          },
        });

        return;
      },
      passwordMatches: async (password: string): Promise<boolean> => {
        const passwordMatches = await compare(password, user.password);

        return passwordMatches;
      },
    };
  }

  async createUser({
    email,
    password,
  }: CreateUser): Promise<ResponseWithError<UserInstance>> {
    try {
      const newUser = await this.dbService.user.create({
        data: {
          email: email,
          password: password,
        },
        include: {
          cities: true,
        },
      });

      return { data: this.createUserInstance(newUser) };
    } catch (error: any) {
      return { error: error.message };
    }
  }
}
