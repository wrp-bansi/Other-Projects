'use strict';
const {
  Model
} = require('sequelize');
const enquiry = require('./enquiry');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.enquiry,{foreignKey:'user_id', as:'enquiry'})
    }
  }
  user.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};