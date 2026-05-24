const blogsRouter = require('express').Router();
const Blog = require('../models/blogSchema');

const getAll = async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
};

const create = async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
};

blogsRouter.get('/', getAll);
blogsRouter.post('/', create);


module.exports = blogsRouter;