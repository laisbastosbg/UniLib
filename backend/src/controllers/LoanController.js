sequelize = require('../database');
const { Op } = require('sequelize');
const moment = require('moment')

const Loan = require('../models/Loan')

module.exports = {
  async index(req, res) {
    const {
      student,
      book,
    } = req.query;

    let where = {};
/*
    name &&
      (where = {
        ...where,
        name: {
          [Op.iLike]: `%${name}%`,
        },
      });

    registration &&
      (where = {
        ...where,
        registration: {
          [Op.iLike]: `%${registration}%`,
        },
      });
*/
    const loans = await Loan.findAll({
      where
    });

    return res.json(loans);
  },

  async getById(id) {
    const loan = await Loan.findByPk(id);

    return loan;
  },

  async store(req, res) {
    try {
      const transaction = await sequelize.transaction();

      const { user } = req;

      const {
        student_id,
        book_id
      } = req.body;

      const user_id = user.id;
      const estimated_return_date = moment().add(14, 'days');

      const loan = await Loan.create(
        {
          user_id,
          student_id,
          book_id,
          estimated_return_date
        },
        {
          transaction,
        },
      );

      transaction.commit();

      return res.status(201).json(loan);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  async update(req, res) {
    try {
      const transaction = await sequelize.transaction();

      const { id } = req.params;
      const { user } = req;
    
      const {
        student_id,
        book_id
      } = req.body;

      const user_id = user.id;

      const updatedLoan = await Loan.update(
        {
          user_id,
          student_id,
          book_id,
        },
        {
          where: {
            id,
          },
        },
        {
          transaction,
        },
      );

      const loan = await Loan.findByPk(id);

      transaction.commit();

      return res.status(200).json(loan);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  async setReturn(req, res) {

    try {
      const { id } = req.params;

      const transaction = await sequelize.transaction();

      const return_date = moment();

      const updatedLoan = await Loan.update(
        {
          return_date
        },
        {
          where: {
            id,
          },
        },
        {
          transaction,
        },
      );

      const loan = await Loan.findByPk(id);

      transaction.commit();

      return res.status(200).json(loan);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  async delete(req, res) {
    try {
      const transaction = await sequelize.transaction();

      const { id } = req.params;

      await Loan.destroy(
        {
          where: {
            id,
          },
        },
        {
          transaction,
        },
      );

      transaction.commit();

      const _loan = await Loan.findByPk(id);

      if (!_loan) {
        return res.status(204).send();
      } else {
        return res.status(500).json({
          error: "Algo deu errado"
        });
      }

      
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
};
