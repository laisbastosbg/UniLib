'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('books', 'synopsis', {
        type: Sequelize.STRING(1023)
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('books', 'synopsis', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ]);
  }
};
