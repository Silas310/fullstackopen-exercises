const blogsRouter = require('express').Router();
const Blog = require('../models/blogSchema');

const getAll = async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1});
  response.json(blogs);
};

const create = async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
};

const update = async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { returnDocument: 'after' });
  response.json(updatedBlog);
}

const deleteBlog = async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
}

blogsRouter.get('/', getAll);
blogsRouter.post('/', create);
blogsRouter.put('/:id', update);
blogsRouter.delete('/:id', deleteBlog);

module.exports = blogsRouter;