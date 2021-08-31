const { Router } = require('express');

const { checkIfIsLoggedIn } = require('../middlewares/Auth');
const UserController = require('../controllers/UserController');

const {
  checkIfUserExists,
  checkIfUserHasPermission,
  checkIfUsernameIsAvailable
} = require('../middlewares/UserMiddlewares');

const usersRouter = Router();

usersRouter.post('/auth', UserController.authenticate);

usersRouter.use(checkIfIsLoggedIn);

usersRouter.get('/', UserController.index);

usersRouter.post('/', checkIfUsernameIsAvailable, checkIfUserHasPermission, UserController.store);

usersRouter.put('/:id', checkIfUserExists, UserController.update);

usersRouter.delete('/:id', checkIfUserExists, UserController.delete);

module.exports = usersRouter;
