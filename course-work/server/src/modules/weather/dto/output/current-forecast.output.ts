import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

import { Weather } from './weather.output';

@ObjectType()
export class CurrentForecast {
  @Field(() => String)
  timestamp: string;

  @Field(() => Float)
  feelsLike: number;

  @Field(() => Int)
  humidity: number;

  @Field(() => [Weather])
  weather: Weather[];
}
