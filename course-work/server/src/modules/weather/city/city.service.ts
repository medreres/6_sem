import { Injectable, Logger } from '@nestjs/common';

import { DbService } from '@/modules/db/db.service';
import { ResponseWithError } from '@/shared/types';

import { City } from './types';

export * from './types';

@Injectable()
export class CityService {
  private readonly logger = new Logger(CityService.name);

  constructor(private readonly dbService: DbService) {}

  async create(city: City): Promise<ResponseWithError<City>> {
    this.logger.log(`Creating city ${city.name}.`);

    try {
      const newCity = await this.dbService.city.create({
        data: city,
      });

      this.logger.verbose(`City ${city.name} create successfully!`);

      return { data: newCity };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async getCityByAddress(address: string): Promise<ResponseWithError<City>> {
    this.logger.log(`Searching for user with address - ${address}`);

    const city = await this.dbService.city.findFirst({
      where: { address: address },
    });

    if (!city) {
      return {
        error: 'City not found',
      };
    }
    this.logger.verbose('City found!');
    this.logger.debug('Data: %O', city);

    return { data: city };
  }
}
