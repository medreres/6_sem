import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CityInput {
  @Field(() => String)
  @IsString()
  cityName: string;
}
