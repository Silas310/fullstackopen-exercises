const express = require('express');
const app = express();
const blogRouter = require('../controllers/blogs');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

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