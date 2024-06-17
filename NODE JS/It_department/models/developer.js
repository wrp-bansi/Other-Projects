'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Developer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Developer.belongsTo(models.Team, { foreignKey: 'team_id' });
    }
  }
  Developer.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    team_id:DataTypes.INTEGER,
    dob: DataTypes.DATE,
    isActive: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Developer',
  });
  return Developer;
};