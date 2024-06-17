const { Sequelize, DataTypes } = require('sequelize')
const logger = require('../helper/logger-helper')
const dotenv = require('dotenv')
dotenv.config()

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    timezone: '+05:30',
  },
)

const connectMySQLDB = async () => {
  try {
    await sequelize.authenticate()
    logger.info('Connected to MySQL successfully!')
  } catch (error) {
    logger.error('Unable to connect to MySQL:', error)
  }

  // Add a disconnect() method to handle connection loss
  sequelize.disconnect = async () => {
    try {
      await sequelize.close()
    } catch (error) {
      logger.error('Unable to disconnect from MySQL:', error)
    }
  }
}

module.exports = {
  sequelize,
  DataTypes,
  connectMySQLDB,
}
