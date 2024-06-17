const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// verify addmin -  generateToken , verifyToken
const allAuthModules = {
  generateAuthToken: function (
    payload,
    hours = global.env.TOKEN_EXPIRY_HOUR + 'h',
  ) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: hours, // Token expiration time
    })
    return token
  },

  verifyToken: async function (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          resolve({
            error: true,
          })
        }
        resolve({
          error: false,
          decoded: decoded,
        })
      })
    })
  },
  generateRefreshToken: function (
    payload,
    refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || '1y'
  ) {
    const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: refreshTokenExpiry, // Token expiration time
    })
    return token
  },
  verifyRefreshToken: async function (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
        if (err) {
          resolve({
            error: true,
          })
        }
        resolve({
          error: false,
          decoded: decoded,
        })
      })
    })
  }
}

module.exports = allAuthModules
