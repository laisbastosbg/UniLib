'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("books", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      author: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      publisher: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      synopsis: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      edition: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      ISBN: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNUll: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNUll: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNUll: false,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("books");
  }
};