import { Request } from 'express';
import { config, createLogger, format, transports } from 'winston';

import { AuthConstants } from '../auth/constants';

import { objectPropertyRegex } from './regex';

const formatOptionConsole = format.combine(
  format.cli(),
  format.splat(),
  format.timestamp(),
  format.printf((info) => {
    return `${info.timestamp} [${info.level}]: ${info.message}`;
  }),
);

const formatOptionFile = format.combine(
  format.cli(),
  format.splat(),
  format.uncolorize(),
  format.timestamp(),
  format.printf((info) => {
    return `${info.timestamp} [${info.level}]: ${info.message}`;
  }),
);

export const instance = createLogger({
  levels: config.npm.levels,
  transports: [
    new transports.DailyRotateFile({
      filename: `logs/%DATE%/error.log`,
      level: 'error',
      format: formatOptionFile,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '30d',
    }),
    new transports.DailyRotateFile({
      filename: `logs/%DATE%/info.log`,
      level: 'info',
      format: formatOptionFile,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '30d',
    }),
    new transports.DailyRotateFile({
      filename: `logs/%DATE%/warning.log`,
      level: 'warning',
      format: formatOptionFile,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '30d',
    }),
    new transports.DailyRotateFile({
      filename: `logs/%DATE%/debug.log`,
      level: 'debug',
      format: formatOptionFile,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '30d',
    }),
    new transports.DailyRotateFile({
      filename: `logs/%DATE%/silly.log`,
      level: 'silly',
      format: formatOptionFile,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '30d',
    }),
    new transports.Console({
      level: 'debug',
      format: formatOptionConsole,
    }),
  ],
});

export function formatRequest(req: Request): object {
  const copy = JSON.parse(JSON.stringify(req.body));

  const sensitiveCredentials: string[] = [
    AuthConstants.Email,
    AuthConstants.Password,
  ];

  sensitiveCredentials.forEach((credential) => {
    // if credentials are provided as inline arguments in query, then replace by regex
    const regex = objectPropertyRegex(credential);
    const replace = `${credential}: "secret"`;
    copy.query = copy.query.replace(regex, replace);

    // if passed as objects, replace their values
    if (copy.variables?.input && credential in copy.variables.input) {
      copy.variables.input[credential] = 'secret';
    }
  });

  return copy;
}
