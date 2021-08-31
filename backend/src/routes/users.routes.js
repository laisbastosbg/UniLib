const { Router } = require('express');
const UserController = require('../controllers/UserController');

const usersRouter = Router();

async function checkIfUserExists(request, response, next) {
  const { login } = request.params;

  const user = await UserController.getByLogin(login);

  if (!user) return response.status(404).json({
    error: "Usuário não encontrado."
  });

  next();
}

async function checkIfUsernameIsAvailable(request, response, next) {
  const { login } = request.body;

  const user = await UserController.getByLogin(login);


  if (user) return response.status(404).json({
    error: "Já existe um usuário cadastrado com esse nome de usuário."
  });

  next();
}

async function checkIfUserHasPermission(request, response, next) {
  const { login } = request.headers;

  const user = await UserController.getByLogin(login);

  if (user.profile != "administrador") return response.status(404).json({
    error: "Você não tem permissão para acessar essa rota"
  });

  next();
}

usersRouter.get('/', UserController.index);

usersRouter.post('/', checkIfUsernameIsAvailable, checkIfUserHasPermission, UserController.store);

usersRouter.post('/auth', UserController.auth);

usersRouter.put('/:id', checkIfUserExists, UserController.update);

usersRouter.delete('/:id', checkIfUserExists, UserController.delete);

module.exports = usersRouter;
