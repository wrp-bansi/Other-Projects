'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Saloon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.SaloonRatting, {
        foreignKey: 'saloonId',
        as: 'rattings'
      });
      this.belongsTo(models.Owner, {
        foreignKey: 'ownerId',
        as: 'owner'
      });

      this.hasMany(models.Barber, { foreignKey: 'saloonId', as: 'barbers' });
    }
  }
  Saloon.init({
    ownerId: DataTypes.INTEGER,
    saloonName: DataTypes.STRING,
    mobileNumber: DataTypes.INTEGER,
    ratting:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Saloon',
  });
  return Saloon;
};