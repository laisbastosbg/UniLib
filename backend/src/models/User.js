const { Model, DataTypes, Sequelize } = require("sequelize");

class User extends Model {
  static init(sequelize) {
      super.init(
      {
        login: DataTypes.STRING,
        profile: DataTypes.STRING,
        name: DataTypes.STRING,
        cpf: DataTypes.STRING,
        email: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        password: DataTypes.STRING,
        birthdate: DataTypes.DATE,
        admission_date: DataTypes.DATE,
        profile: DataTypes.ENUM('administrador', 'bibliotecario'),
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

module.exports = User;
