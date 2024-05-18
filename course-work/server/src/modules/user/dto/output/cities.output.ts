import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Cities {
  @Field(() => [String])
  cities: string[];
}
