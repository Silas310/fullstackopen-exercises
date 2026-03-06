const blogsRouter = require('express').Router();
const Blog = require('../models/blogSchema');

const getAll = (request, response) => {
  Blog.find({}).then(blogs => response.json(blogs));
};

const create = (request, response) => {
  const blog = new Blog(request.body);
  blog.save().then(result => response.status(201).json(result));
};

blogsRouter.get('/', getAll);
blogsRouter.post('/', create);


module.exports = blogsRouter;