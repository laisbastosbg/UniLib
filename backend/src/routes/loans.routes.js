const { Router } = require('express');
const LoanController = require('../controllers/LoanController');

const {
  checkIfBookExists,
  checkIfLoanExists,
  checkIfStudentExists,
  checkIfUserExists,
  checkIfStudentCanBorrow,
  checkIfAlreadyReturned,
  checkIfBookIsAvailable
} = require('../middlewares/LoanMiddlewares')

const loansRouter = Router();

loansRouter.get('/', LoanController.index);

loansRouter.post('/',
  checkIfBookExists,
  checkIfStudentExists,
  checkIfUserExists,
  checkIfStudentCanBorrow,
  checkIfBookIsAvailable,
  LoanController.store
);

loansRouter.put('/:id',
  checkIfLoanExists,
  checkIfUserExists,
  checkIfBookIsAvailable,
  LoanController.update
);

loansRouter.patch('/:id',
  checkIfLoanExists,
  checkIfAlreadyReturned,
  LoanController.setReturn
);

loansRouter.delete('/:id',
  checkIfLoanExists,
  LoanController.delete
);

module.exports = loansRouter;
