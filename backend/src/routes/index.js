const express = require('express');

const booksRouter = require('./books.routes')

const routes = express.Router();

routes.use('/books', booksRouter);

module.exports = routes;