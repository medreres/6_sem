import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { City, InputArgs } from '@/shared';

import { JwtGuard } from '../auth/guards';

import { CityInput } from './dto';
import { GeocoderService } from './geocoder.service';

@UseGuards(JwtGuard)
@Resolver()
export class GeocoderResolver {
  constructor(private readonly geocoderService: GeocoderService) {}

  @Query(() => [City])
  findCity(
    @InputArgs({ type: () => CityInput }) { cityName }: CityInput,
  ): Promise<City[]> {
    return this.geocoderService.getCitiesPrediction(cityName);
  }
}
