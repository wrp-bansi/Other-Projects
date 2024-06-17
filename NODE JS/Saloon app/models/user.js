'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.BarberRatting, { foreignKey: 'userId', as: 'barberRatings' });


      this.hasMany(models.SaloonRatting, { foreignKey: 'userId', as: 'saloonRatings' });


      // this.hasMany(models.Barber, { foreignKey: 'userId', as: 'barbers' });


      // this.hasMany(models.Saloon, { foreignKey: 'userId', as: 'saloons' });


      this.hasMany(models.Owner, { foreignKey: 'userId', as: 'owners' });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
    mobileNumber:DataTypes.INTEGER,
    role:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};