const { Router } = require('express');
const UserController = require('../controllers/UserController');

const usersRouter = Router();

async function checkIfUserExists(request, response, next) {
  const { id } = request.params;

  const user = await UserController.getById(id);

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

usersRouter.get('/', UserController.index);

usersRouter.post('/', checkIfUsernameIsAvailable, UserController.store);

usersRouter.put('/:id', checkIfUserExists, UserController.update);

usersRouter.delete('/:id', checkIfUserExists, UserController.delete);

module.exports = usersRouter;
