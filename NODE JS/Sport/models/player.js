const moment = require('moment');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Player.init({
    name: DataTypes.STRING,
    age: DataTypes.STRING,
    captain: DataTypes.STRING,
    dob: {
      type: DataTypes.DATE,

  }

  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};