const express = require('express');

const booksRouter = require('./books.routes')
const usersRouter = require('./users.routes')
const studentsRouter = require('./students.routes')
const loansRouter = require('./loans.routes');

const routes = express.Router();

routes.use('/books', booksRouter);
routes.use('/users', usersRouter);
routes.use('/students', studentsRouter);
routes.use('/loans', loansRouter);

module.exports = routes;
