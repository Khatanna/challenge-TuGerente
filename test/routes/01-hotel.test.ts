import request from 'supertest';
import { assert } from 'chai';
import mocha from 'mocha';
import { sequelize } from '../../src/database';
import app from '../../src/app';
import { Hotel } from '../../src/database/models/Hotel';
import { StatusCodes } from 'http-status-codes';
import { Room } from '../../src/database/models/Room';

const { OK, CREATED, CONFLICT, NOT_FOUND } = StatusCodes;
const { describe, before, beforeEach, it, after } = mocha;

describe('GET /hotels', () => {
  before(async () => {
    await sequelize.sync({ force: true });
    await Hotel.create({
      name: 'hotelName',
      direction: 'direction'
    });
  });
  it('return all hotel of database correctly', async () => {
    const {
      body: { hotels },
      status
    } = await request(app).get('/hotels');

    const count = await Hotel.count();

    assert.isArray(hotels);
    assert.equal(status, OK);
    assert.equal(hotels.length, count);
  });
  it('return hotel by id', async () => {
    const { body, status } = await request(app).get('/hotels/1');
    const hotel = await Hotel.findByPk(1, { include: [Room] });
    assert.equal(status, OK);
    assert.deepEqual(body, hotel?.toJSON());
  });
  it('return an message of error if hotel not exist', async () => {
    const { body, status } = await request(app).get('/hotels/15');
    assert.equal(status, NOT_FOUND);
    assert.deepEqual(body, {
      message: 'hotel not found'
    });
  });
  it('return hotel by name', async () => {
    const hotel = await Hotel.findByPk(1, { include: [Room] });
    const { body, status } = await request(app).get('/hotels').query({
      name: 'hotelName'
    });

    assert.equal(status, OK);
    assert.deepEqual(body, hotel?.toJSON());
  });
  it('return an message of error if hotel not exist', async () => {
    const { body, status } = await request(app).get('/hotels').query({
      name: 'hotel'
    });

    assert.equal(status, NOT_FOUND);
    assert.deepEqual(body, {
      message: 'hotel not found'
    });
  });
});
describe('POST /hotels', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });
  it('create a hotel if all fields are valid and complete correctly', async () => {
    const { body, status } = await request(app).post('/hotels').send({
      name: 'hotelName',
      direction: 'direction'
    });
    const hotelOfDatabase = await Hotel.findByPk(1);

    assert.equal(status, CREATED);
    assert.deepEqual(body, hotelOfDatabase?.toJSON());
  });
  it('returns an error if the "name" field is missing', async () => {
    const { body, status } = await request(app).post('/hotels').send({
      direction: 'direction'
    });

    assert.deepEqual(body, {
      message: 'All fields are required'
    });
    assert.equal(status, CONFLICT);
  });
  it('returns an error if the "direction" field is missing', async () => {
    const { body, status } = await request(app).post('/hotels').send({
      name: 'hotelName'
    });

    assert.deepEqual(body, {
      message: 'All fields are required'
    });
    assert.equal(status, CONFLICT);
  });
  it('returns an error if the fields is missing', async () => {
    const { body, status } = await request(app).post('/hotels');

    assert.deepEqual(body, {
      message: 'All fields are required'
    });
    assert.equal(status, CONFLICT);
  });
  it('returns an error if hotel already exist', async () => {
    const { body, status } = await request(app).post('/hotels').send({
      name: 'hotelName',
      direction: 'direction'
    });

    assert.deepEqual(body, {
      message: 'This hotel already exist'
    });
    assert.equal(status, CONFLICT);
  });
  after(async () => {
    await sequelize.sync({ force: true });
  });
});

describe('PUT /hotels', () => {
  before(async () => {
    await sequelize.sync({ force: true });
    await Hotel.create({
      name: 'hotelName',
      direction: 'direction'
    });
  });
  it('returns an message and hotel if update "name" of hotel correctly', async () => {
    const {
      body: { message, hotel },
      status
    } = await request(app).put('/hotels/1').send({
      name: 'hotelUpdated'
    });
    const hotelOfDatabase = await Hotel.findByPk(1);
    assert.equal(status, OK);
    assert.equal(message, 'hotel updated correctly');
    assert.deepEqual(hotel, hotelOfDatabase?.toJSON());
  });
  it('returns an message of error if hotel not exist', async () => {
    const { body, status } = await request(app).put('/hotels/10').send({
      email: 'hotelUpdated'
    });

    assert.equal(status, NOT_FOUND);
    assert.deepEqual(body, {
      message: 'hotel not found'
    });
  });
  it('returns an message and hotel if update "direction" of hotel correctly', async () => {
    const {
      body: { message, hotel },
      status
    } = await request(app).put('/hotels/1').send({
      direction: 'hotelUpdated'
    });
    const hotelOfDatabase = await Hotel.findByPk(1);
    assert.equal(status, OK);
    assert.equal(message, 'hotel updated correctly');
    assert.deepEqual(hotel, hotelOfDatabase?.toJSON());
  });
  it('returns an message of error if hotel not exist', async () => {
    const { body, status } = await request(app).put('/hotels/10').send({
      direction: 'hotelUpdated'
    });

    assert.equal(status, NOT_FOUND);
    assert.deepEqual(body, {
      message: 'hotel not found'
    });
  });
});
describe('DELETE /hotels', () => {
  before(async () => {
    await sequelize.sync({ force: true });
    await Hotel.create({
      name: 'hotelName',
      direction: 'direction'
    });
  });
  it('returns an message and hotel if deleted hotel correctly', async () => {
    const {
      body: { message, hotel },
      status
    } = await request(app).delete('/hotels/1');
    const hotelOfDatabase = await Hotel.findByPk(1);

    assert.equal(status, OK);
    assert.deepEqual(message, 'hotel deleted correctly');
    assert.isNull(hotelOfDatabase);
  });
  it('returns an message of error if hotel not exist', async () => {
    const { body, status } = await request(app).delete('/hotels/10');

    assert.equal(status, NOT_FOUND);
    assert.deepEqual(body, {
      message: 'hotel not found'
    });
  });
});
