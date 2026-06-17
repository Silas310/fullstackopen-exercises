const blogsRouter = require('express').Router();
const Blog = require('../models/blogSchema');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');


const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
}


const getAll = async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1});
  response.json(blogs);
};

const create = async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return response.status(401).json({ error: 'user not found' });
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user.id
  });

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();
  
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