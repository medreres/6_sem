import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { weather } from '@/configuration';

import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { GeocoderService } from '../geocoder/geocoder.service';

import { CityService } from './city/city.service';
import { WeatherResolver } from './weather.resolver';
import { WeatherService } from './weather.service';

@Module({
  imports: [AuthModule, ConfigModule.forFeature(weather)],
  providers: [
    CityService,
    WeatherService,
    WeatherResolver,
    GeocoderService,
    JwtService,
    AuthService,
  ],
})
export class WeatherModule {}
