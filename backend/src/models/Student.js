const { Model, DataTypes, Sequelize } = require("sequelize");

class Student extends Model {
  static init(sequelize) {
      super.init(
      {
        name: DataTypes.STRING,
        resgistration: DataTypes.STRING,
        course: DataTypes.STRING,
        email: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        birthdate: DataTypes.DATE,
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

module.exports = Student;
