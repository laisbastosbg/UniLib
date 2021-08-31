const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');

const sequelize = require('../database');

const User = require('../models/User');

class UserController {
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

      const users = await User.findAll({
        where,/*
        attributes: {
          exclude: ['password']
        }*/
      });

      return response.json(users);
  }

  async getById(id) {
    const user = await User.findByPk(id);

    return user;
  }

  async getByLogin(login) {
    const [user] = await User.findAll({
      where: {
        login
      }
    });

    return user;
  }

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

      const saltRounds = parseInt(process.env.SALT_ROUNDS)

      const hash = bcrypt.hashSync(password, saltRounds)
      console.log("hash: ", hash)
      const user = await User.create({
        login,
        name,
        cpf,
        email,
        phone_number,
        password: hash,
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
        description: error
      })
    }
  }

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
  }

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
  }

  async auth(request, response) {
    const { login, password } = request.body;

    let user = await User.findOne({ where: { login }});

    if(!user) return response.status(404).json({ error: 'Usuário não encontrado' })

    const authenticate = bcrypt.compareSync(password, user.password);

    if(!authenticate) return response.status(401).json({error: 'senha incorreta'});

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400.
    });

    return response.status(200).json({
      login: user.login,
      profile: user.profile,
      id: user.id,
      token
    })
  }
}

module.exports = new UserController();
