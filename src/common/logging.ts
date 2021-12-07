import  { NextFunction, Request, Response } from 'express';
import { createLogger, format, transports } from 'winston';
import { finished } from 'stream';
import fs from 'fs';

const logger = createLogger({
    level: 'silly',
    format: format.combine(
      format.colorize(),
      format.cli(),
    ),
    transports: [
      new transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: format.combine(
          format.uncolorize(),
          format.json()
        )
      }),
      new transports.File({
        filename: 'logs/info.log',
        level: 'info',
        format: format.combine(
          format.uncolorize(),
          format.json()
        )
      }),
    ]
  });

export const requestsLogger = (req: Request, res: Response, next: NextFunction): void => {
    const logmsg = {
        'URL':req.originalUrl,
        'Method':req.method,
        'params':{},
        'body':req.body,
        'statusCode':res.statusCode,
        'Time':new Date()
    };
    finished(res, () => {  
        const {statusCode} = res;
        logmsg.statusCode = statusCode;
        logmsg.params = req.params;
        logger.log('info', logmsg);
      })

    next();
}

export const errorsLogger = (err:  Error, req: Request, res: Response, next: NextFunction): void => {
  const errmsg = {
      'errorName': err.name,
      'errorMessage': err.message,
      'URL':req.originalUrl,
      'Method':req.method,
      'params':{},
      'body':req.body,
      'statusCode':res.statusCode,
      'Time':new Date()
  };
  finished(res, () => {  
      const {statusCode} = res;
      errmsg.statusCode = statusCode;
      errmsg.params = req.params;
      logger.log('error', errmsg);
    })

  next(err);
}

export const logUncaughtException = (err: Error, origin: string): void => {
  const uncaughtExceptionmsg = {
      'errorName': 'uncaughtException',
      'errorMessage': err.message,
      'errorType': origin,
      'Time':new Date()
  };
  fs.appendFileSync('logs/error.log', `${JSON.stringify(uncaughtExceptionmsg)}\n`);
  process.exit(1)
}

export const logUnhandledRejection = ():void => {
  const unhandledRejection = {
    'errorName': 'Unhandled Rejection',
    'errorMessage': 'Unhandled Rejection at promise',
    'Time':new Date()
  };
  fs.appendFileSync('logs/error.log', `${JSON.stringify(unhandledRejection)}\n`);
}