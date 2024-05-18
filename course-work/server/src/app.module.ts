import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { CacheModule } from './modules/cache/cache.module';
import { DbModule } from './modules/db/db.module';
import { GeocoderModule } from './modules/geocoder/geocoder.module';
import { GraphqlModule } from './modules/graphql/graphql.module';
import { LoggerModule } from './modules/logger/logger.module';
import { LoggerMiddleware } from './modules/logger/middleware';
import { UserModule } from './modules/user/user.module';
import { WeatherModule } from './modules/weather/weather.module';
import { envSchema } from './configuration';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: envSchema,
      cache: true,
      isGlobal: true,
    }),
    DbModule,
    GraphqlModule,
    CacheModule,
    GeocoderModule,
    AuthModule,
    UserModule,
    WeatherModule,
    GraphqlModule,
    CacheModule,
  ],
  providers: [Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
