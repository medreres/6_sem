import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import 'winston-daily-rotate-file';

import { LoggerService } from './modules/logger/logger.service';
import { AppModule } from './app.module';

// TODO check auth

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(LoggerService);
  app.useLogger(logger);

  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get('PORT') || 3000;

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({}));
  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  await app.listen(port);

  logger.info(`App is listening on port ${port}`);
}
bootstrap();
