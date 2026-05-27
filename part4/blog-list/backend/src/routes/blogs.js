const blogsRouter = require('express').Router();
const blogsController = require('../controllers/blogs');

blogsRouter.get('/', blogsController.getAll);
blogsRouter.post('/', blogsController.create);
blogsRouter.put('/:id', blogsController.update);
blogsRouter.delete('/:id', blogsController.delete);

module.exports = blogsRouter;