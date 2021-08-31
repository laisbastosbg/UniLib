const { Router } = require('express');
const StudentController = require('../controllers/StudentController');

const { checkIfStudentExists } = require('../middlewares/StudentMiddlewares');

const studentsRouter = Router();

studentsRouter.get('/', StudentController.index);

studentsRouter.post('/', StudentController.store);

studentsRouter.put('/:id', checkIfStudentExists, StudentController.update);

studentsRouter.delete('/:id', checkIfStudentExists, StudentController.delete);

module.exports = studentsRouter;
