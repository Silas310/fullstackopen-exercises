const express = require('express');
const app = express();
const blogRouter = require('../controllers/blogs');
const userRouter = require('../controllers/users');
const loginRouter = require('../controllers/login');
const mongoose = require('mongoose');
const {unknownEndpoint, errorHandler} = require('../utils/middleware');

const { MONGODB_URI } = require('../utils/config');

mongoose.connect(MONGODB_URI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use(express.json());
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;