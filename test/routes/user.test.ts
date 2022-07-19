import request from 'supertest';
import { assert } from 'chai';
import mocha from 'mocha';
import { sequelize } from '../../src/database';
import app from '../../src/app';
import { User } from '../../src/database/models/User';
import { StatusCodes } from 'http-status-codes';

const { OK, CREATED, CONFLICT, NOT_FOUND } = StatusCodes;
const { describe, before, beforeEach, it, after } = mocha;

describe('[users] route', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });
  describe('GET /users', () => {
    before(async () => {
      await sequelize.sync({ force: true });
      await User.create({
        email: 'user@gmail.com',
        password: '71264652'
      });
    });
    it('return all users of database correctly', async () => {
      const {
        body: { users },
        status
      } = await request(app).get('/users');
      const count = await User.count();
      assert.isArray(users);
      assert.equal(status, OK);
      assert.equal(users.length, count);
    });
    it('return user by id', async () => {
      const { body, status } = await request(app).get('/users/1');
      const user = await User.findByPk(1);
      assert.equal(status, OK);
      assert.deepEqual(body, user?.toJSON());
    });
    it('return an message of error if user not exist', async () => {
      const { body, status } = await request(app).get('/users/15');
      assert.equal(status, NOT_FOUND);
      assert.deepEqual(body, {
        message: 'user not found'
      });
    });
    it('return user by email', async () => {
      const user = await User.findByPk(1);
      const { body, status } = await request(app).get('/users').query({
        email: 'user@gmail.com'
      });

      assert.equal(status, OK);
      assert.deepEqual(body, user?.toJSON());
    });
    it('return an message of error if user not exist', async () => {
      const { body, status } = await request(app).get('/users').query({
        email: 'user123@gmail.com'
      });
      assert.equal(status, NOT_FOUND);
      assert.deepEqual(body, {
        message: 'user not found'
      });
    });
  });
  describe('POST /users', () => {
    before(async () => {
      await sequelize.sync({ force: true });
    });
    it('create a user if all fields are valid and complete correctly', async () => {
      const { body, status } = await request(app).post('/users').send({
        email: 'user@gmail.com',
        password: '123456789'
      });
      const userOfDatabase = await User.findByPk(1);

      assert.equal(status, CREATED);
      assert.deepEqual(body, userOfDatabase?.toJSON());
    });
    it('returns an error if the "email" field is missing', async () => {
      const { body, status } = await request(app).post('/users').send({
        password: '123456789'
      });

      assert.deepEqual(body, {
        message: 'All fields are required'
      });
      assert.equal(status, CONFLICT);
    });
    it('returns an error if the "password" field is missing', async () => {
      const { body, status } = await request(app).post('/users').send({
        email: 'user@gmail.com'
      });

      assert.deepEqual(body, {
        message: 'All fields are required'
      });
      assert.equal(status, CONFLICT);
    });
    it('returns an error if the fields is missing', async () => {
      const { body, status } = await request(app).post('/users');

      assert.deepEqual(body, {
        message: 'All fields are required'
      });
      assert.equal(status, CONFLICT);
    });
    it('returns an error if user already exist', async () => {
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

  describe('PUT /users', () => {
    before(async () => {
      await sequelize.sync({ force: true });
      await User.create({
        email: 'user@gmail.com',
        password: '71264652'
      });
    });
    it('returns an message and user if updated user correctly', async () => {
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
    it('returns an message of error if user not exist', async () => {
      const { body, status } = await request(app).put('/users/10').send({
        email: 'userUpdated@gmail.com'
      });

      assert.equal(status, NOT_FOUND);
      assert.deepEqual(body, {
        message: 'user not found'
      });
    });
  });
  describe('DELETE /users', () => {
    before(async () => {
      await sequelize.sync({ force: true });
      await User.create({
        email: 'user@gmail.com',
        password: '71264652'
      });
    });
    it('returns an message and user if deleted user correctly', async () => {
      const {
        body: { message, user },
        status
      } = await request(app).delete('/users/1');
      const userOfDatabase = await User.findByPk(1);

      assert.equal(status, OK);
      assert.deepEqual(message, 'user deleted correctly');
      assert.isNull(userOfDatabase);
    });
    it('returns an message of error if user not exist', async () => {
      const { body, status } = await request(app).delete('/users/10');

      assert.equal(status, NOT_FOUND);
      assert.deepEqual(body, {
        message: 'user not found'
      });
    });
  });
  after(async () => {
    await sequelize.close();
  });
});
