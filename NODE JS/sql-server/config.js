const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('users', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
