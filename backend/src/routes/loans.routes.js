const { Router } = require('express');
const LoanController = require('../controllers/LoanController');

const {
  checkIfBookExists,
  checkIfLoanExists,
  checkIfStudentExists,
  checkIfUserExists
} = require('../middlewares/LoanMiddlewares')

const loansRouter = Router();

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
