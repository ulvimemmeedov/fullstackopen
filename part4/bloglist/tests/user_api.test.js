const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');

const { BCRYPT_SALT_OR_ROUNDS } = require('../utils/config');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

const userPayload = { username: 'test', name: 'Test', password: 'test' };

beforeEach(async () => {
  await User.deleteMany({});

  await new User({
    username: 'azurediamond',
    name: 'AzureDiamond',
    passwordHash: await bcrypt.hash('hunter2', BCRYPT_SALT_OR_ROUNDS),
  }).save();
});

describe('creating a user', () => {
  test('succeeds with a unique username', async () => {
    const initialCount = await User.countDocuments();

    const newUser = {
      username: 'cthon98',
      name: 'Cthon98',
      password: '*******',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(await User.countDocuments()).toEqual(initialCount + 1);
    expect(await User.exists({ username: newUser.username })).not.toBeNull();
  });

  test('fails with missing properties', () =>
    api.post('/api/users').send({}).expect(400));

  test('fails with a username shorter than 3 characters', () =>
    api
      .post('/api/users')
      .send({ ...userPayload, username: 'te' })
      .expect(400));

  test('fails with a password shorter than 3 characters', () =>
    api
      .post('/api/users')
      .send({ ...userPayload, password: 'te' })
      .expect(400));

  test('fails with an existing username', async () => {
    const initialCount = await User.countDocuments();

    const response = await api
      .post('/api/users')
      .send({ ...userPayload, username: 'azurediamond' })
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('username must be unique');
    expect(initialCount).toEqual(await User.countDocuments());
  });
});

afterAll(() => mongoose.connection.close());
