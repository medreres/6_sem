import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Weather {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  main: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  icon: string;
}
