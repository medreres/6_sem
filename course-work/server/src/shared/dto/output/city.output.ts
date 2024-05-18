import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class City {
  @Field(() => String)
  name: string;

  @Field(() => String)
  address: string;
}
