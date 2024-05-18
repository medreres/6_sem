import { Field, Float, ObjectType } from '@nestjs/graphql';

import { City } from './city.output';

//? how to avoid duplication when cant extends 2 classes
@ObjectType()
export class CityWithCoordinates extends City {
  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lon: number;
}
