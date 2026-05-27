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

const deleteBlog = async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
}

blogsRouter.get('/', getAll);
blogsRouter.post('/', create);
blogsRouter.delete('/:id', deleteBlog);

module.exports = blogsRouter;