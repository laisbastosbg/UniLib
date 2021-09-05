const sequelize = require('../database');
const { Op } = require('sequelize');

const Student = require('../models/Student')

class StudentController {
  async index(req, res) {
    const {
      name,
      registration,
    } = req.query;

    let where = {};

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

    const students = await Student.findAll({
      where
    });

    return res.json(students);
  }

  async getById(id) {
    const student = await Student.findByPk(id);

    return student;
  }

  async store(req, res) {
    try {
      const transaction = await sequelize.transaction();

      const {
        name,
        registration,
        course,
        email,
        phone_number,
        birthdate
      } = req.body;

      console.log(req.body)


      const student = await Student.create(
        {
          name,
          registration,
          course,
          email,
          phone_number,
          birthdate
        },
        {
          transaction,
        },
      );

      transaction.commit();

      return res.status(201).json(student);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      const transaction = await sequelize.transaction();
    
      const {
        name,
        registration,
        course,
        email,
        phone_number,
        birthdate
      } = req.body;

      const updatedStudent = await Student.update(
        {
          name,
          registration,
          course,
          email,
          phone_number,
          birthdate
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

      const student = await Student.findByPk(id);

      transaction.commit();

      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const transaction = await sequelize.transaction();

      const { id } = req.params;

      await Student.destroy(
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

      const _student = await Student.findByPk(id);

      if (!_student) {
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
}

module.exports = new StudentController();
