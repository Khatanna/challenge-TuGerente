import { config } from 'dotenv';
import { Dialect } from 'sequelize/types';
import path from 'path';
config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_DATABASE_HOST,
  DB_DIALECT,
  DB_DATABASE_TEST
} = process.env;

const development = {
  database: DB_DATABASE,
  dialect: DB_DIALECT as Dialect,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_DATABASE_HOST,
  logging: false,
  models: [path.join(__dirname, './models')]
};
const test = {
  database: DB_DATABASE_TEST,
  dialect: DB_DIALECT as Dialect,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_DATABASE_HOST,
  logging: false,
  models: [path.join(__dirname, './models')]
};
export { development, test };
