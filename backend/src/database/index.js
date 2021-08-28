const Sequelize = require('sequelize');
const dbConfig = require('../config/sequelize_config');

const User = require('../models/User');
const Book = require('../models/Book')
const Student = require('../models/Student')
const Loan = require('../models/Loan')

const connection = new Sequelize(dbConfig);

User.init(connection);
Book.init(connection);
Student.init(connection);
Loan.init(connection);

User.associate(connection.models);
Book.associate(connection.models);
Student.associate(connection.models);
Loan.associate(connection.models);

module.exports = connection;
