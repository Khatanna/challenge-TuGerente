import Request from 'supertest';
import { assert } from 'chai';
import mocha from 'mocha';

const { describe, before, beforeEach, it, after } = mocha;

describe('GET /users', () => {
  it('return all user of database', () => {
    assert.equal(1, 1);
  });
});
