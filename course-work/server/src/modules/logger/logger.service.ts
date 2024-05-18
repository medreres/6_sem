import { Injectable } from '@nestjs/common';
import { LoggerService as NestLoggerService } from '@nestjs/common';
import winston from 'winston';

import { instance } from './utils';

@Injectable()
export class LoggerService implements NestLoggerService {
  instance: winston.Logger;

  constructor() {
    this.instance = instance;
  }

  log(message: string, ...optionalParams: any[]) {
    this.instance.info(message, ...optionalParams);
  }

  info(message: string, ...optionalParams: any[]) {
    this.instance.info(message, ...optionalParams);
  }

  error(message: string, ...optionalParams: any[]) {
    this.instance.error(message, ...optionalParams);
  }

  warn(message: string, ...optionalParams: any[]) {
    this.instance.warn(message, ...optionalParams);
  }

  debug(message: string, ...optionalParams: any[]) {
    this.instance.debug(message, ...optionalParams);
  }

  verbose(message: string, ...optionalParams: any[]) {
    this.instance.debug(message, ...optionalParams);
  }
}
