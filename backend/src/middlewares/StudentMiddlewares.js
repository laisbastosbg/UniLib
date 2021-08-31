const StudentController = require('../controllers/StudentController');

class StudentMiddlewares {
  async checkIfStudentExists(request, response, next) {
    const { id } = request.params;
  
    const student = await StudentController.getById(id);
  
  
    if (!student) return response.status(404).json({
      error: "Aluno não encontrado."
    });
  
    next();
  }
}

module.exports = new StudentMiddlewares();