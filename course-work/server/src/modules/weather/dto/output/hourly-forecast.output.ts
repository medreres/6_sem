import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

import { Weather } from './weather.output';

@ObjectType()
export class HourlyForecast {
  @Field(() => String)
  timestamp: string;

  @Field(() => Float)
  temperature: number;

  @Field(() => Int)
  humidity: number;

  @Field(() => [Weather])
  weather: Weather[];
}
