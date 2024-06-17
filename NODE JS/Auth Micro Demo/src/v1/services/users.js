
const userLogin = require("../models/users");

async function getOneUser(whereParams) {
  const user = await userLogin.findOne({ where: whereParams });
  if (!user) {
    throw new Error("User Not found")
  } else {
    return user
  }
}

async function getSingleUser(whereParams) {
  const user = await userLogin.findOne({ where: whereParams });
  if (user) {
    throw new Error("User already created, please login");
  } else {
    return user;
  }
}

async function createUser(createParams) {
  const user = await userLogin.create({ ...createParams });
  return user;

}


async function updateUser(updateParams, userData) {
  const [data] = await userLogin.update(userData, {
    where: updateParams,
  });
  if (data === 0) {
      throw new Error("User not found");
  }
  return { message: "User updated successfully" };
}
module.exports = { getSingleUser,createUser,getOneUser,updateUser }