'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SaloonRatting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Saloon, {
        foreignKey: 'saloonId',
        as: 'saloon'
      });

    }
  }
  SaloonRatting.init({
    saloonId: DataTypes.INTEGER,
    ratting: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SaloonRatting',
  });
  return SaloonRatting;
};