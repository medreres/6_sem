import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

import { Env } from '@/configuration';

@Injectable()
export class DbService extends PrismaClient {
  constructor(config: ConfigService<Env>) {
    super({
      datasources: {
        db: {
          url: config.get('POSTGRES_URL'),
        },
      },
    });
  }
}
