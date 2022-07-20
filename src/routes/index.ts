import { Router } from 'express';
import { readdirSync } from 'fs';
import { StatusCodes } from 'http-status-codes';
import { join } from 'path';

const router = Router();
const { OK, BAD_REQUEST } = StatusCodes;

router.get('/', (_, res) => {
  res.status(OK).json({
    status: OK
  });
});

const paths = readdirSync(__dirname).flatMap((file) => {
  if (!/index/.test(file)) {
    router.use(
      `/${file.slice(0, -3)}`,
      require(join(__dirname, `./${file}`)).default
    );
    return file.slice(0, -3);
  }
  return [];
});

router.get('*', (req, res) => {
  res.status(BAD_REQUEST).send({ message: `[${req.url}] not found` });
});

export { router, paths };
