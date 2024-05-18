import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { user } from '@/configuration';

import { AuthService } from '../auth/auth.service';
import { GeocoderService } from '../geocoder/geocoder.service';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Global()
@Module({
  imports: [ConfigModule.forFeature(user)],
  providers: [
    UserResolver,
    GeocoderService,
    JwtService,
    AuthService,
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
