import { Field, Int, ObjectType } from '@nestjs/graphql';

import { CityWithCoordinates } from '@/shared';

@ObjectType()
export class Token {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => [CityWithCoordinates])
  cities: CityWithCoordinates[];
}
