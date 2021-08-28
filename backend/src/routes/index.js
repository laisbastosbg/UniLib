const express = require('express');

const booksRouter = require('./books.routes')
const usersRouter = require('./users.routes')

const routes = express.Router();

routes.use('/books', booksRouter);
routes.use('/users', usersRouter);

module.exports = routes;