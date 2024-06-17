const mongoose = require('mongoose')
const logger = require('../helpers/logger-helper')
const dotenv = require('dotenv')
dotenv.config()

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error)
  }
  mongoose.connection.on('error', (err) => {
    logger.error('MongoDB connection error:', err)
  })
  mongoose.connection.on('disconnected', () => {
    logger.error('MongoDB connection lost')
  })
}

module.exports = { connectMongoDB }
