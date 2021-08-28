const express = require('express');

const booksRouter = require('./books.routes')
const usersRouter = require('./users.routes')
const studentsRouter = require('./students.routes')

const routes = express.Router();

routes.use('/books', booksRouter);
routes.use('/users', usersRouter);
routes.use('/students', studentsRouter);

module.exports = routes;