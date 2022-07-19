import { Sequelize } from 'sequelize-typescript';
import { development, test } from './config';

export const sequelize = new Sequelize(process.env.DEV ? development : test);
