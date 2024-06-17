const { DataTypes } = require('sequelize');
const sequelize = require('../connection/database');

const Note = sequelize.define('notes', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  Title: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  description:{
    type:DataTypes.STRING,
    allowNull:false
  },
  stastus:{
    type:DataTypes.STRING,
    allowNull:false
  }
});

module.exports = Note