import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { CacheStore, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

import { Weather, weather } from '@/configuration';

@Module({
  imports: [
    NestCacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule.forFeature(weather)],
      useFactory: async (configService: ConfigService<Weather>) => ({
        store: (await redisStore({
          ttl: configService.get('WEATHER_EXPIRATION'),
          socket: {
            port: configService.get('REDIS_PORT'),
            host: configService.get('REDIS_HOST'),
          },
        })) as unknown as CacheStore,
        /**
         * Default method of configuration CacheModule doesn't work
         * because of mismatching types of redisStore and store param of CacheModule
         * Github issue
         * https://github.com/dabroek/node-cache-manager-redis-store/issues/53
         */
      }),
      inject: [ConfigService],
    }),
  ],
})
export class CacheModule {}
