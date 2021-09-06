const { Router } = require('express');
const BookController = require('../controllers/BookController');

const { checkIfBookExists, checkIfBookIsAvailable } = require('../middlewares/BookMiddlewares');

const booksRouter = Router();

booksRouter.get('/', BookController.index);

booksRouter.post('/', BookController.store);

booksRouter.put('/:id', checkIfBookExists, BookController.update);

booksRouter.delete('/:id', checkIfBookExists, BookController.delete);

module.exports = booksRouter;
