const blogsRouter = require('express').Router();
const blogsController = require('../controllers/blogs');

blogsRouter.get('/', blogsController.getAll);
blogsRouter.post('/', blogsController.create);
blogsRouter.delete('/:id', blogsController.delete);

module.exports = blogsRouter;