const BookController = require('../controllers/BookController');

class BookMiddlewares {
  async checkIfBookExists(request, response, next) {
    const { id } = request.params;
  
    const book = await BookController.getById(id);
  
  
    if (!book) return response.status(404).json({
      error: "Livro não encontrado."
    });
  
    next();
  }
}

module.exports = new BookMiddlewares();