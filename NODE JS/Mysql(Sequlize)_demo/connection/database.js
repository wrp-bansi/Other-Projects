const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('employee_database', 'root', 'Bansi', {
  host: "localhost",
  dialect: "mysql",
  port:"4306",
  logging:false

});

module.exports = sequelize;