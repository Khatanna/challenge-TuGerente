import request from 'supertest';
import { assert } from 'chai';
import mocha from 'mocha';
import { sequelize } from '../../src/database';
import app from '../../src/app';
import { Reservation } from '../../src/database/models/Reservation';
import { Room } from '../../src/database/models/Room';
import { User } from '../../src/database/models/User';
import { StatusCodes } from 'http-status-codes';
import { Hotel } from '../../src/database/models/Hotel';

const { OK, CREATED, CONFLICT, NOT_FOUND } = StatusCodes;
const { describe, before, beforeEach, it, after, xit } = mocha;

describe('GET /reservations', () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const user = await User.create({
      email: 'user@gmail.com',
      password: '71264652'
    });
    const hotel = await Hotel.create({
      name: 'newHotel',
      direction: 'directionOfHotel'
    });
    await Room.create({
      roomNumber: 45,
      capacity: 4,
      numberOfBeds: 4,
      reservePrice: 2500,
      hotelId: hotel.id
    });
    await Room.create({
      roomNumber: 15,
      capacity: 4,
      numberOfBeds: 4,
      reservePrice: 2500,
      hotelId: hotel.id
    });
    await Reservation.create({
      state: 'paid',
      daysOfStay: 14,
      userId: user.id,
      roomId: 45
    });
    await Reservation.create({
      daysOfStay: 31,
      userId: user.id,
      roomId: 15
    });
  });
  xit('return all users of database correctly', async () => {
    await User.findByPk(1, {
      include: {
        attributes: ['id', 'state'],
        model: Reservation,
        include: [Room]
      }
    });
    assert.equal(1, 1);
  });
  xit('return user by id', async () => {
    const { body, status } = await request(app).get('/users/1');
    const user = await User.findByPk(1);
    assert.equal(status, OK);
    assert.deepEqual(body, user?.toJSON());
  });
  xit('return an message of error if user not exist', async () => {
    const { body, status } = await request(app).get('/users/15');
    assert.equal(status, NOT_FOUND);
    assert.deepEqual(body, {
      message: 'user not found'
    });
  });
  xit('return user by email', async () => {
    const user = await User.findByPk(1);
    const { body, status } = await request(app).get('/users').query({
      email: 'user@gmail.com'
    });

    assert.equal(status, OK);
    assert.deepEqual(body, user?.toJSON());
  });
  xit('return an message of error if user not exist', async () => {
    const { body, status } = await request(app).get('/users').query({
      email: 'user123@gmail.com'
    });
    assert.equal(status, NOT_FOUND);
    assert.deepEqual(body, {
      message: 'user not found'
    });
  });
});
describe('POST /reservatons', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });
  xit('create a user if all fields are valid and complete correctly', async () => {
    const { body, status } = await request(app).post('/users').send({
      email: 'user@gmail.com',
      password: '123456789'
    });
    const userOfDatabase = await User.findByPk(1);

    assert.equal(status, CREATED);
    assert.deepEqual(body, userOfDatabase?.toJSON());
  });
  xit('returns an error if the "email" field is missing', async () => {
    const { body, status } = await request(app).post('/users').send({
      password: '123456789'
    });

    assert.deepEqual(body, {
      message: 'All fields are required'
    });
    assert.equal(status, CONFLICT);
  });
  xit('returns an error if the "password" field is missing', async () => {
    const { body, status } = await request(app).post('/users').send({
      email: 'user@gmail.com'
    });

    assert.deepEqual(body, {
      message: 'All fields are required'
    });
    assert.equal(status, CONFLICT);
  });
  xit('returns an error if the fields is missing', async () => {
    const { body, status } = await request(app).post('/users');

    assert.deepEqual(body, {
      message: 'All fields are required'
    });
    assert.equal(status, CONFLICT);
  });
  xit('returns an error if user already exist', async () => {
    const { body, status } = await request(app).post('/users').send({
      email: 'user@gmail.com',
      password: '123456789'
    });

    assert.deepEqual(body, {
      message: 'This user already exist'
    });
    assert.equal(status, CONFLICT);
  });
});
describe('PUT /reservatons', () => {
  before(async () => {
    await sequelize.sync({ force: true });
    await User.create({
      email: 'user@gmail.com',
      password: '71264652'
    });
  });
  xit('returns an message and user if updated user correctly', async () => {
    const {
      body: { message, user },
      status
    } = await request(app).put('/users/1').send({
      email: 'userUpdated@gmail.com'
    });
    const userOfDatabase = await User.findByPk(1);
    assert.equal(status, OK);
    assert.equal(message, 'user updated correctly');
    assert.deepEqual(user, userOfDatabase?.toJSON());
  });
  xit('returns an message of error if user not exist', async () => {
    const { body, status } = await request(app).put('/users/10').send({
      email: 'userUpdated@gmail.com'
    });

    assert.equal(status, NOT_FOUND);
    assert.deepEqual(body, {
      message: 'user not found'
    });
  });
});
describe('DELETE /reservatons', () => {
  before(async () => {
    await sequelize.sync({ force: true });
    await User.create({
      email: 'user@gmail.com',
      password: '71264652'
    });
  });
  xit('returns an message and user if deleted user correctly', async () => {
    const {
      body: { message, user },
      status
    } = await request(app).delete('/users/1');
    const userOfDatabase = await User.findByPk(1);

    assert.equal(status, OK);
    assert.deepEqual(message, 'user deleted correctly');
    assert.isNull(userOfDatabase);
  });
  xit('returns an message of error if user not exist', async () => {
    const { body, status } = await request(app).delete('/users/10');

    assert.equal(status, NOT_FOUND);
    assert.deepEqual(body, {
      message: 'user not found'
    });
  });
});
