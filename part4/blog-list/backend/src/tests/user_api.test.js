const {test, after, beforeEach, describe} = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server/app');
const api = supertest(app);
const bcrypt = require('bcrypt');

const User = require('../models/userSchema');
const helper = require('./user_api_helper');


describe('test for invalid users format', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    for (const user of helper.initialUsers) {
      const passwordHash = await bcrypt.hash("12345", 10);
      const userObject = new User({
        username: user.username,
        name: user.name,
        passwordHash,
      });
      await userObject.save();
    }
  });

  test('password has at least 3 char', async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      username: "test",
      name: "test user",
      password: "va",
    };

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.match(result.body.error, /password must be at least 3 characters long/);
    
    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  })

  test('username has at least 3 char', async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      username: "te",
      name: "test user",
      password: "val",
    };

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.match(result.body.error, /shorter than the minimum allowed length/);
    
    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  })

  test('username is unique', async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      username: "root",
      name: "test user",
      password: "val",
    };

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const username = usersAtStart.map(u => u.username)
    assert.match(result.body.error, /unique/);
    
    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  })

  test('created succesful', async () => {
    const user = {
      username: "test",
      name: "test user",
      password: "val",
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    assert.ok(usernames.includes(user.username));
  })
})

after(() => {
  mongoose.connection.close();
})