'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.BarberRatting, {
        foreignKey: 'barberId',
        as: 'rattings'
      });

      this.belongsTo(models.Saloon, { foreignKey: 'saloonId' });

    }
  }
  Barber.init({
    saloonId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    ratting: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Barber',
  });
  return Barber;
};