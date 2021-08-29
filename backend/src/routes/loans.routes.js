const { Router } = require('express');
const StudentController = require('../controllers/StudentController');
const BookController = require('../controllers/BookController');
const UserController = require('../controllers/UserController');
const LoanController = require('../controllers/LoanController');

const loansRouter = Router();

async function checkIfLoanExists(request, response, next) {
  const { id } = request.params;

  const loan = await LoanController.getById(id);

  if (!loan) return response.status(404).json({
    error: "Empréstmo não encontrado."
  });

  next();
}

async function checkIfStudentExists(request, response, next) {
  const { student_id } = request.body;

  const student = await StudentController.getById(student_id);


  if (!student) return response.status(404).json({
    error: "Aluno não encontrado."
  });

  next();
}

async function checkIfBookExists(request, response, next) {
  const { book_id } = request.body;

  const book = await BookController.getById(book_id);


  if (!book) return response.status(404).json({
    error: "Livro não encontrado."
  });

  next();
}

async function checkIfUserExists(request, response, next) {
  const { user_id } = request.body;

  const user = await UserController.getById(user_id);

  if (!user) return response.status(404).json({
    error: "Usuário não encontrado."
  });

  request.user = user;

  next();
}

loansRouter.get('/', LoanController.index);

loansRouter.post('/',
  checkIfBookExists,
  checkIfStudentExists,
  checkIfUserExists,
  LoanController.store
);

loansRouter.put('/:id',
  checkIfLoanExists,
  checkIfUserExists,
  LoanController.update
);

loansRouter.patch('/:id',
  checkIfLoanExists,
  LoanController.setReturn
);

loansRouter.delete('/:id',
  checkIfLoanExists,
  LoanController.delete
);

module.exports = loansRouter;
