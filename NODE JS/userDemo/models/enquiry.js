'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class enquiry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      enquiry.belongsTo(models.user,{foreignKey:'user_id',as:'user'})
    }
  }
  enquiry.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
     references:{
      model:user,

     }
    },
    subject: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'enquiry',
  });
  return enquiry;
};