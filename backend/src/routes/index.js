const express = require('express');

const TestController = require('../controllers/TestController');

const routes = express.Router();

routes.get('/test', TestController.get);

module.exports = routes;