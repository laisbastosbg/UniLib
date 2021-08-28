const { Model, DataTypes, Sequelize } = require("sequelize");

class Book extends Model {
  static init(sequelize) {
      super.init(
      {
        title: DataTypes.STRING,
        author: DataTypes.STRING,
        publisher: DataTypes.STRING,
        synopsis: DataTypes.STRING,
        edition: DataTypes.STRING,
        isbn: DataTypes.STRING,
      },
      {
        sequelize,
        paranoid: true,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Loan)
  }
}

module.exports = Book;
