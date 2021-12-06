import  { NextFunction, Request, Response } from 'express';
import { createLogger, format, transports } from 'winston';
import { finished } from 'stream';

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