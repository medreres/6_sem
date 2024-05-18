import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { formatRequest } from '../utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, _res: Response, next: NextFunction) {
    this.logger.log(`Request body: %O`, formatRequest(req));
    next();
  }
}
