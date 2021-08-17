const { Model, DataTypes, Sequelize } = require("sequelize");

class Loan extends Model {
  static init(sequelize) {
      super.init(
      {
        estimated_return_date: DataTypes.DATE,
        return_date: DataTypes.DATE,
      },
      {
        sequelize,
        paranoid: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id"
    })

    this.belongsTo(models.Book, {
      foreignKey: "book_id"
    })

    this.belongsTo(models.Student, {
      foreignKey: "student_id"
    })
  }
}

module.exports = Loan;
