const UserController = require('../controllers/UserController');

class UserMiddlewares {
  async checkIfUserExists(request, response, next) {
    const { id } = request.params;

    const user = await UserController.getById(id);

    if (!user) return response.status(404).json({
      error: "Usuário não encontrado."
    });

    next();
  }

  async checkIfUsernameIsAvailable(request, response, next) {
    const { login } = request.body;

    const user = await UserController.getByLogin(login);


    if (user) return response.status(401).json({
      error: "Já existe um usuário cadastrado com esse nome de usuário."
    });

    next();
  }

  async checkIfUserHasPermission(request, response, next) {
    const { login } = request.headers;

    const user = await UserController.getByLogin(login);

    if (!user) return response.status(404).json({
      error: "Este usuário não existe"
    });

    if (user.profile != "administrador") return response.status(401).json({
      error: "Você não tem permissão para acessar essa rota"
    });

    next();
  }

  async validateFields(request, response, next) {
    const { login, cpf, email, password } = request.body;

    if (!!login && !!cpf && !!email && !!password) {
      next();
    } else {
      return response.status(404).json({
        error: "Campos não preenchidos corretamente"
      });
    }

  }
}

module.exports = new UserMiddlewares();