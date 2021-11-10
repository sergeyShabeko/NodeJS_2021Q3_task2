import { Sequelize } from 'sequelize';
import { config } from '../config';

export const sequelize = new Sequelize(config.POSTGRES_DB, config.POSTGRES_USER, config.POSTGRES_PASSWORD, {
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT,
  dialect: 'postgres',
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });
