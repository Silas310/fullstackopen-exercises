const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");

const supertest = require("supertest");

const app = require("../server/app");
const api = supertest(app);

const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const helper = require("./blog_api_helper");

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  await Blog.insertMany(helper.initialBlogs);

  const passwordHash = await bcrypt.hash("vascodagama", 10);
  const newUser = {
    username: "silascosta",
    name: "Silas Costa",
    passwordHash,
  };
  await new User(newUser).save();
  const loginResponse = await api
    .post("/api/login")
    .send({ username: newUser.username, password: "vascodagama" });

  token = `Bearer ${loginResponse.body.token}`;
});

test("all blogs are returned as json and amount is equal", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("_id is actually id", async () => {
  const response = await api.get("/api/blogs");

  assert.ok(response.body[0].id);
  assert.strictEqual(response.body[0]._id, undefined);
});

test("successful blog creation", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Silas",
    url: "https://test.com",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", token)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  // same size after adding a new blog
  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  // new blog inserted
  const titles = blogsAtEnd.map((b) => b.title);
  assert.ok(titles.includes("Test Blog"));
});

test("successful blog update", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  const outdatedBlogData = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes,
  };

  // Ensure the blog exists before updating
  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(outdatedBlogData)
    .expect(200);

  // Verify the blog data is unchanged after the update
  assert.strictEqual(response.body.title, outdatedBlogData.title);
  assert.strictEqual(response.body.author, outdatedBlogData.author);
  assert.strictEqual(response.body.url, outdatedBlogData.url);
  assert.strictEqual(response.body.likes, outdatedBlogData.likes);

  // Now update the blog with new data

  const updatedBlogData = {
    title: "Updated Title",
    author: "Updated Author",
    url: "https://updated.com",
    likes: 10,
  };

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlogData)
    .expect(200);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);

  const updatedBlog = blogsAtEnd.find((b) => b.id === blogToUpdate.id);
  assert.strictEqual(updatedBlog.title, "Updated Title");
  assert.strictEqual(updatedBlog.author, "Updated Author");
  assert.strictEqual(updatedBlog.url, "https://updated.com");
  assert.strictEqual(updatedBlog.likes, 10);
});

test("successful blog deletion", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

  const titles = blogsAtEnd.map((b) => b.title);
  assert.ok(!titles.includes(blogToDelete.title));
});

test("if likes property is missing, it defaults to 0", async () => {
  const newBlog = {
    title: "Test Blog Without Likes",
    author: "Silas",
    url: "https://test.com",
  };

  const response = await api
    .post("/api/blogs")
    .set("Authorization", token)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("title is required", async () => {
  const newBlog = {
    author: "Silas",
    url: "https://test.com",
    likes: 5,
  };

  const response = await api
    .post("/api/blogs")
    .set("Authorization", token)
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

test("url is required", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Silas",
    likes: 5,
  };

  const response = await api
    .post("/api/blogs")
    .set("Authorization", token)
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

after(async () => {
  await mongoose.connection.close();
});
