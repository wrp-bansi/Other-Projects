const users = require('../models/users')

// Function to generate a 7-digit username
const generateUsername = () => {
  const min = 1000000
  const max = 9999999
  return Math.floor(Math.random() * (max - min + 1) + min).toString()
}

// Function to check username uniqueness
const isUsernameUnique = async (username) => {
  const user = await users.findOne({ where: { user_unique_id: username } })
  return !user
}

// Main function to get a unique username
const getUniqueUsername = async () => {
  let uniqueFound = false
  let username

  while (!uniqueFound) {
    username = generateUsername()
    uniqueFound = await isUsernameUnique(username)
  }

  return username
}

module.exports = { getUniqueUsername }
