sequelize = require('../database');
const { Op } = require('sequelize');

const Book = require('../models/Book')

module.exports = {
  async index(req, res) {
    const {
      title,
      author,
      publisher,
      isbn
    } = req.query;

    let where = {};

    title &&
      (where = {
        ...where,
        title: {
          [Op.iLike]: `%${title}%`,
        },
      });

    author &&
    (where = {
      ...where,
      author: {
        [Op.iLike]: `%${author}%`,
      },
    });

    publisher &&
      (where = {
      ...where,
      publisher: {
        [Op.iLike]: `%${publisher}%`,
      },
    });

    isbn &&
      (where = {
      ...where,
      isbn: {
        [Op.iLike]: `%${isbn}%`,
      },
    });

    const books = await Book.findAll({
      where
    });

    return res.json(books);
  },

  async getById(req, res) {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    return res.status(200).json(book);
  },

  async store(req, res) {
    try {
      const t = await sequelize.transaction();

      const {
          title,
          author,
          publisher,
          synospsis,
          edition,
          ISBN
      } = req.body;


      const book = await Book.create(
        {
          title,
          author,
          publisher,
          synospsis,
          edition,
          ISBN
        },
        {
          transaction: t,
        },
      );

      t.commit();

      return res.status(201).json(book);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  async update(req, res) {
    try {
      const t = await sequelize.transaction();
    
      const { id } = req.params;

      const {
          title,
          author,
          publisher,
          synospsis,
          edition,
          ISBN
      } = req.body;

      var book = await Book.findByPk(id);

      if (!book) {
        return res.status(404).json('Group not found');
      }

      const updatedBook = await Book.update(
        {
          title,
          author,
          publisher,
          synospsis,
          edition,
          ISBN
        },
        {
          where: {
            id,
          },
        },
        {
          transaction: t,
        },
      );

      t.commit();

      return res.status(200).json(updatedBook);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  async delete(req, res) {
    try {
      const t = await sequelize.transaction();

      const { id } = req.params;

      const book = await Book.findByPk(id);

      if (!book) {
        return res.status(404).json('Group not found');
      }

      await GBoup.destroy(
        {
          where: {
            id,
          },
        },
        {
          transaction: t,
        },
      );

      t.commit();

      const _book = await Book.findByPk(id);

      if (!_book) {
        return res.status(204).json('success');
      } else {
        return res.status(500).json('error');
      }

      
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
};
