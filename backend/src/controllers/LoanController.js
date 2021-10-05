sequelize = require('../database');
const { Op } = require('sequelize');
const moment = require('moment');

const Loan = require('../models/Loan');
const User = require('../models/User');
const Student = require('../models/Student');
const Book = require('../models/Book');

class LoanController {
  async index(req, res) {
    const {
      student,
      book,
      return_date
    } = req.query;

    let where = {};

    return_date && (
      where = {
        return_date: moment(return_date).startOf('day')
      }
    )

    let studentWhere = {};

    student &&
      (studentWhere = {
        ...studentWhere,
        name: {
          [Op.iLike]: `%${student}%`,
        },
      });

    let bookWhere = {};

    book &&
      (bookWhere = {
        ...bookWhere,
        title: {
          [Op.iLike]: `%${book}%`,
        },
      });

    const loans = await Loan.findAll({
      where,
      include: [
        {
          model: Student,
          attributes: ['name']
        },
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Book,
          attributes: ['title']
        },
      ],
      order: [
        ['estimated_return_date', 'desc']
      ]
    });

    const today = moment();

    const _loans = loans.map((loan, idx) => {
      let status = "";
      let fine = 0;

      if (!!loan.return_date) {
        status = loan.estimated_return_date >= loan.return_date ?
          "Devolvido" : "Devolvido com atraso"
      } else {
        status = loan.estimated_return_date >= today ?
          "Alugado" : "Em atraso"
      }

      if (status !== "Devolvido" && status !== "Alugado") {
        let estimated_return_date = moment(loan.estimated_return_date).startOf('day');
        let return_date = loan.return_date ? moment(loan.return_date) : moment();
        let dias_de_atraso = return_date.diff(estimated_return_date, 'days');

        fine = dias_de_atraso * 2
      }

      const book = loan.dataValues.Book.dataValues.title;

      const student = loan.dataValues.Student.dataValues.name;

      const user = loan.dataValues.User.dataValues.name;

      let return_date = !!loan.return_date ?
        moment.utc(loan.return_date).format("DD/MM/YYYY") : "Não devolvido";

      const _loan = {
        ...loan.dataValues,
        status,
        fine: fine.toFixed(2),
        book,
        student,
        user,
        return_date
      }

      return _loan;
    })

    return res.json(_loans);
  }

  async getById(id) {
    const loan = await Loan.findByPk(id);

    return loan;
  }

  async store(req, res) {
    try {
      const transaction = await sequelize.transaction();

      const { user } = req;

      const {
        student_id,
        book_id
      } = req.body;

      const user_id = user.id;
      const estimated_return_date = moment().add(14, 'days').endOf('day');

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
  }

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
  }

  async countLoans(student_id) {
    const count = await Loan.count({
      where: { student_id, return_date: null }
    })


    return count;
  }

  async setReturn(req, res) {

    try {
      const { id } = req.params;

      const transaction = await sequelize.transaction();

      const return_date = moment().startOf('day');

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
  }

  async hasBeenReturned(id) {
    const loan = Loan.findOne({
      where: {
        id,
        return_date: {
          [Op.ne]: null
        }
      }
    });

    return loan
  }

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
  }
};

module.exports = new LoanController();
