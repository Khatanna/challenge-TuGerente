import express from 'express';
import { config } from 'dotenv';
import { router } from './routes/index';

const app = express();
config();

app.use(express.json());
app.use('/', router);

export default app;
