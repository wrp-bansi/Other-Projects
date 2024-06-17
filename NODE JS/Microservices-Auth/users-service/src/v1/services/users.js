const userLogin = require("../models/users");

//Get One User
async function getSingleUser(whereParams) {
  const user = await userLogin.findOne({where: whereParams});
  if (user) {
    throw new Error("User already created, please login");
  } else {
    return user;
  }
}

// Create User
async function createUser(createParams) {
  const user = await userLogin.create({...createParams});
  return user;
}

// Get All user with pagination
async function getUserwithpagination(whereParams, otherdata) {
  const data = await userLogin.findAndCountAll({
    ...whereParams,
    ...otherdata,
  });
  // If no user found, throw an error
  if (!data || data.rows.length === 0) {
    return {count: 0, rows: []};
  }
  return data;
}

// Get One user
async function getOneUser(whereParams) {
  const user = await userLogin.findOne({where: whereParams});
  if (!user) {
    throw new Error("User Not found")
  } else {
    return user
  }
}

// Get All user with count
async function getUserData(queryOptions) {
  const data = await userLogin.findAndCountAll(queryOptions);
  return data;
}

// Get All Active-user
async function getactiveUser(whereParams) {
  const user = await userLogin.findOne({where: whereParams});
  return user;
}

// Get All user without pagination
async function getAllUser(whereParams) {

  const data = await userLogin.findAll({where: whereParams});
  return data;
}

// Update user
async function updateUser(updateParams, userData) {

  const existingUser = await getOneUser(updateParams);
  if (!existingUser) {
    throw new Error("User not found");
  }
  await existingUser.update(userData);

  return existingUser;
}

// Delete user
async function deleteUser(deleteParams) {
  const data = await userLogin.destroy({where: deleteParams})
  if (data === 0) {
    throw new Error("user not found");
  }
  return {msg: "user deleted successfully"};
}

// Count user
async function countUsers(whereParams) {
  return await userLogin.count({where: whereParams});
}

module.exports = {getOneUser, getUserData, updateUser, getUserwithpagination, getAllUser, deleteUser, getSingleUser, getactiveUser, createUser, countUsers}