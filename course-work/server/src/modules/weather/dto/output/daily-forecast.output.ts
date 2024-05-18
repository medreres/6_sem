import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

import { Temperature } from './temperature.output';
import { Weather } from './weather.output';

@ObjectType()
export class DailyForecast {
  @Field(() => String)
  timestamp: string;

  @Field(() => String)
  sunrise: string;

  @Field(() => String)
  sunset: string;

  @Field(() => Float)
  windSpeed: number;

  @Field(() => Float)
  uvi: number;

  @Field(() => Float)
  precipitation: number;

  @Field(() => Temperature)
  temperature: Temperature;

  @Field(() => Int)
  humidity: number;

  @Field(() => [Weather])
  weather: Weather[];
}
