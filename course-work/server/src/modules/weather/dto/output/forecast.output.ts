import { Field, ObjectType } from '@nestjs/graphql';

import { City } from '@/shared';

import { CurrentForecast } from './current-forecast.output';
import { DailyForecast } from './daily-forecast.output';
import { HourlyForecast } from './hourly-forecast.output';

@ObjectType()
export class Forecast {
  @Field(() => [DailyForecast])
  daily: DailyForecast[];

  @Field(() => CurrentForecast)
  current: CurrentForecast;

  @Field(() => [HourlyForecast])
  hourly: HourlyForecast[];

  @Field(() => City)
  city: City;
}
