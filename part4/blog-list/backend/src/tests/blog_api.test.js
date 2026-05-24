const {test, after, beforeEach} = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server/app');
const api = supertest(app);

const Blog = require('../models/blogSchema');
const helper = require('./blog_api_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('all blogs are returned as json and amount is equal', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('_id is actually id', async () => {
  const response = await api
    .get('/api/blogs');

  assert.ok(response.body[0].id);
  assert.strictEqual(response.body[0]._id, undefined);
});

test('successful blog creation', async () => {
  const newBlog ={
    title: "Test Blog",
    author: "Silas",
    url: "https://test.com",
    likes: 5
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  // same size after adding a new blog
  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  // new blog inserted
  const titles = blogsAtEnd.map(b => b.title);
  assert.ok(titles.includes('Test Blog'));
});

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: "Test Blog Without Likes",
    author: "Silas",
    url: "https://test.com",
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  console.log('response body: ', response.body);
  assert.strictEqual(response.body.likes, 0);
});


after(async () => {
  await mongoose.connection.close();
});