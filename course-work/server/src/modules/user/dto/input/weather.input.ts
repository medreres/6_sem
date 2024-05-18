import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class WeatherInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  cityName: string;
}
