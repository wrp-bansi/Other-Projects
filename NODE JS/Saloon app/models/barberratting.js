'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BarberRatting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Barber, {
        foreignKey: 'barberId',
        as: 'barber'
      });
    }
  }
  BarberRatting.init({
    barberId: DataTypes.INTEGER,
    ratting: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BarberRatting',
  });
  return BarberRatting;
};