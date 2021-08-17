const { Router } = require('express');
const BookController = require('../controllers/BookController');

const booksRouter = Router();


booksRouter.get('/', BookController.index);

booksRouter.post('/', BookController.store);

booksRouter.put('/', BookController.update);

booksRouter.delete('/', BookController.delete);

module.exports = booksRouter;
