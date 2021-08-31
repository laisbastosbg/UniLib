const UserController = require('../controllers/UserController');

class UserMiddlewares {
  async checkIfUserExists(request, response, next) {
    const { login } = request.params;

    const user = await UserController.getByLogin(login);

    if (!user) return response.status(404).json({
      error: "Usuário não encontrado."
    });

    next();
  }

  async checkIfUsernameIsAvailable(request, response, next) {
    const { login } = request.body;

    const user = await UserController.getByLogin(login);


    if (user) return response.status(404).json({
      error: "Já existe um usuário cadastrado com esse nome de usuário."
    });

    next();
  }

  async checkIfUserHasPermission(request, response, next) {
    const { login } = request.headers;

    const user = await UserController.getByLogin(login);

    if (user.profile != "administrador") return response.status(404).json({
      error: "Você não tem permissão para acessar essa rota"
    });

    next();
  }
}

module.exports = new UserMiddlewares();