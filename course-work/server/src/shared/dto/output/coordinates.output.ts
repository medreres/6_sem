import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Coordinates {
  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lon: number;
}
