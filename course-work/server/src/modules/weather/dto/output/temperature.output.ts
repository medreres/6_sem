import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Temperature {
  @Field(() => Float)
  min: number;

  @Field(() => Float)
  max: number;

  @Field(() => Float)
  day: number;

  @Field(() => Float)
  night: number;
}
