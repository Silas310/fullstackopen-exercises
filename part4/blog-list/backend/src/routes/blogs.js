const blogsRouter = require('express').Router();
const blogsController = require('../controllers/blogs');

blogsRouter.get('/', blogsController.getAll);
blogsRouter.post('/', blogsController.create);

module.exports = blogsRouter;