import { NextFunction, Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { logUncaughtException, logUnhandledRejection } from './logging';


export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorHandling = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    if (err instanceof AppError) {
        res.status(err.statusCode).send(err.message);
        return;
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

process.on('uncaughtException', (error: Error, origin: string) => {
    logUncaughtException(error, origin);
});

process.on('unhandledRejection', (reason, _promise) => {
    console.log('Unhandled Rejection at:', reason);
    logUnhandledRejection();
});