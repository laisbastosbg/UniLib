sequelize = require('../database');
const { Op } = require('sequelize');
const User = require('../models/User');

const Book = require('../models/User');

module.exports = {
  async index(request, response) {
    const {
      login,
      name,
      cpf,
      profile
    } = request.query;

    let where = {};

    login && 
      (where = {
        ...where,
        login: {
          [Op.iLike]: `%${login}%`,
        },
      });

      name && 
        (where = {
          ...where,
          name: {
            [Op.iLike]: `%${name}%`,
          },
        });

      cpf && 
        (where = {
          ...where,
          cpf: {
            [Op.iLike]: `%${cpf}%`,
          },
        });

      profile && 
        (where = {
          ...where,
          profile,
        });

      const users = await User.findAll({where});

      return response.json(users);
  },

  async getById(id) {
    const user = await User.findByPk(id);

    return user;
  },

  async getByLogin(login) {
    const [user] = await User.findAll({
      where: {
        login
      }
    });

    return user;
  },

  async store(request, response) {
    try {
      const {
        login,
        name,
        cpf,
        email,
        phone_number,
        password,
        birthdate,
        profile
      } = request.body;

      const transaction = await sequelize.transaction();

      const user = await User.create({
        login,
        name,
        cpf,
        email,
        phone_number,
        password,
        birthdate,
        profile
      }, {
        transaction
      });

      transaction.commit();

      return response.status(201).json(user);

    } catch (error) {
      return response.status(500).json({
        error: "Algo deu errado",
        description: error.message
      })
    }
  },
  
  async update(request, response) {
    try {
      const { id } = request.params;

      const {
        login,
        name,
        cpf,
        email,
        phone_number,
        password,
        birthdate,
        profile
      } = request.body;

      const transaction = await sequelize.transaction();

      const updatedUser = await User.update({
        login,
        name,
        cpf,
        email,
        phone_number,
        password,
        birthdate,
        profile
      }, {
        where: {
          id,
        },
      }, {
        transaction
      });

      const user = await User.findByPk(id);

      transaction.commit();

      return response.status(200).json(user);

    } catch (error) {
      return response.status(500).json({
        error: "Algo deu errado",
        description: error.message
      })
    }
  },
  
  async delete(request, response) {
    try {
      const transaction = sequelize.transaction();

      const { id } = request.params;

      await User.destroy({
        where: {
          id,
        },
      }, {
        transaction
      });

      transaction.commit();

      const _user = await User.findByPk(id);

      if(_user) {
        return response.status(500).json({
          error: "Algo deu errado"
        })
      }

      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({
        error: "Algo deu errado",
        description: error.message
      });
    }
  },
}
