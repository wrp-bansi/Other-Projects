const redis = require('redis')
const logger = require('../helpers/logger-helper')
require('dotenv').config()

const client = redis.createClient({
  // password:process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
})

// Currently connected localhost redis if cdn then pass above configuration
client.on('connect', () => {
  logger.info('Redis connected successfully')
})

client.on('reconnecting', (info) => {
  logger.info(
    `Redis is reconnecting. Attempt ${info.attempt} after ${info.delay}ms`,
  )
})

client.on('error', (err) => {
  logger.info('Redis Error:', err)
})

client.on('end', () => {
  logger.info('Redis client disconnected')
})

module.exports = client
