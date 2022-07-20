import express, { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import { router } from './routes/index';
import morgan from 'morgan';
import path from 'path';
import { StatusCodes } from 'http-status-codes';

const { INTERNAL_SERVER_ERROR } = StatusCodes;

const app = express();
config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/', router);

app.use(({ message }: Error, _: Request, res: Response, next: NextFunction) => {
  console.log(`index error[review the 'server.js' file]: ${message}`);
  res
    .status(INTERNAL_SERVER_ERROR)
    .send({ code: INTERNAL_SERVER_ERROR, message });
});

export default app;
