import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

export const config: {
    PORT: number;
    POSTGRES_PORT: number; 
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    POSTGRES_HOST: string;
} = {
  PORT: +process.env['PORT']!,
  POSTGRES_PORT: +process.env['POSTGRES_PORT']!,
  POSTGRES_USER: process.env['POSTGRES_USER']!,
  POSTGRES_PASSWORD: process.env['POSTGRES_PASSWORD']!,
  POSTGRES_DB: process.env['POSTGRES_DB']!,
  POSTGRES_HOST: process.env['POSTGRES_HOST']!
};
