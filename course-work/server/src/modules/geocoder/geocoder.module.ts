import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from '../auth/auth.service';

import { GeocoderResolver } from './geocoder.resolver';
import { GeocoderService } from './geocoder.service';

@Module({
  providers: [GeocoderService, GeocoderResolver, JwtService, AuthService],
})
export class GeocoderModule {}
