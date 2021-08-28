const { Router } = require('express');
const BookController = require('../controllers/BookController');

const booksRouter = Router();

async function checkIfBookExists(request, response, next) {
  const { id } = request.params;

  const book = await BookController.getById(id);


  if (!book) return response.status(404).json({
    error: "Livro não encontrado."
  });

  next();
}

booksRouter.get('/', BookController.index);

booksRouter.post('/', BookController.store);

booksRouter.put('/:id', checkIfBookExists, BookController.update);

booksRouter.delete('/:id', checkIfBookExists, BookController.delete);

module.exports = booksRouter;
