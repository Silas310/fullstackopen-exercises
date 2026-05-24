const express = require('express');
const app = express();
const blogRouter = require('../controllers/blogs');
const mongoose = require('mongoose');

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

module.exports = app;