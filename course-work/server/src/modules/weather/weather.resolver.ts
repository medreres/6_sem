import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { InputArgs } from '@/shared';

import { JwtGuard } from '../auth/guards';
import { CityInput } from '../geocoder/dto';

import { Forecast } from './dto';
import { WeatherService } from './weather.service';

@UseGuards(JwtGuard)
@Resolver()
export class WeatherResolver {
  constructor(private readonly weatherService: WeatherService) {}

  @Query(() => Forecast)
  forecast(
    @InputArgs({ type: () => CityInput }) { cityName }: CityInput,
  ): Promise<Forecast> {
    return this.weatherService.getForecast(cityName);
  }

  @Query(() => [Forecast])
  forecasts(
    @InputArgs({ type: () => [CityInput] }) cityNames: CityInput[],
  ): Promise<Forecast[]> {
    return this.weatherService.getForecasts(
      cityNames.map((city) => city.cityName),
    );
  }
}
