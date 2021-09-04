const StudentController = require('../controllers/StudentController');
const BookController = require('../controllers/BookController');
const UserController = require('../controllers/UserController');
const LoanController = require('../controllers/LoanController');

class LoanMiddlewares {
  async checkIfLoanExists(request, response, next) {
    const { id } = request.params;
  
    const loan = await LoanController.getById(id);
  
    if (!loan) return response.status(404).json({
      error: "Empréstmo não encontrado."
    });
  
    next();
  }
  
  async checkIfStudentExists(request, response, next) {
    const { student_id } = request.body;
  
    const student = await StudentController.getById(student_id);
  
  
    if (!student) return response.status(404).json({
      error: "Aluno não encontrado."
    });
  
    next();
  }
  
  async checkIfBookExists(request, response, next) {
    const { book_id } = request.body;
  
    const book = await BookController.getById(book_id);
  
  
    if (!book) return response.status(404).json({
      error: "Livro não encontrado."
    });
  
    next();
  }
  
  async checkIfUserExists(request, response, next) {
    const { user_id } = request.body;
  
    const user = await UserController.getById(user_id);
  
    if (!user) return response.status(404).json({
      error: "Usuário não encontrado."
    });
  
    request.user = user;
  
    next();
  }
  
  async checkIfUserExists(request, response, next) {
    const { user_id } = request.body;
  
    const user = await UserController.getById(user_id);
  
    if (!user) return response.status(404).json({
      error: "Usuário não encontrado."
    });
  
    request.user = user;
  
    next();
  }
  
  async checkIfStudentCanBorrow(request, response, next) {
    const { student_id } = request.body;
  
    const count = await LoanController.countLoans(student_id);
  
    if (count >= 3) {
      return response.status(401).json({
        error: "Este aluno já possui 3 empréstimos em aberto!"
      })
    }

    next();
  }
  
  async checkIfAlreadyReturned(request, response, next) {
    const { id } = request.params;
  
    const loan = await LoanController.hasBeenReturned(id);
  
    if (loan) {
      return response.status(401).json({
        error: "Este empréstimo já foi fechado!"
      })
    }
    
    next();
  }
}

module.exports = new LoanMiddlewares;