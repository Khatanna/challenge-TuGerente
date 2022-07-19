import request from 'supertest';
import { assert } from 'chai';
import mocha from 'mocha';
import { sequelize } from '../../src/database';
import app from '../../src/app';
import { Room } from '../../src/database/models/Room';
import { StatusCodes } from 'http-status-codes';

const { OK, CREATED, CONFLICT, NOT_FOUND } = StatusCodes;
const { describe, before, beforeEach, it, after } = mocha;

describe('[rooms] route', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });
  after(async () => {
    // await sequelize.close();
  });
});