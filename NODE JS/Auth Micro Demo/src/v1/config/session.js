const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redisClient = require('./redis') // Import the Redis configuration file
require('dotenv').config()

module.exports = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
})
