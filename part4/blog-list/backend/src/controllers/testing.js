// need to reset db and create user for testing purposes
const testingRouter = require("express").Router();

const User = require("../models/userSchema");
const Blog = require("../models/blogSchema");

const bcrypt = require("bcrypt");

const resetDatabase = async (request, response) => {
  console.log('Resetting db...');
  await Blog.deleteMany({});
  await User.deleteMany({});
  console.log('DB reset complete.');
  response.status(204).end();
};

const createUser = async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10; // number of rounds for hashing
  // hash equation is password + saltRounds -> hashedPassword
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  await user.save();
  response.status(201).json(user);
};

testingRouter.post("/reset", resetDatabase);
testingRouter.post("/users", createUser);

module.exports = testingRouter;
