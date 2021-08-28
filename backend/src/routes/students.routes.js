const { Router } = require('express');
const StudentController = require('../controllers/StudentController');

const studentsRouter = Router();

async function checkIfStudentExists(request, response, next) {
  const { id } = request.params;

  const student = await StudentController.getById(id);


  if (!student) return response.status(404).json({
    error: "Aluno não encontrado."
  });

  next();
}

studentsRouter.get('/', StudentController.index);

studentsRouter.post('/', StudentController.store);

studentsRouter.put('/:id', checkIfStudentExists, StudentController.update);

studentsRouter.delete('/:id', checkIfStudentExists, StudentController.delete);

module.exports = studentsRouter;
