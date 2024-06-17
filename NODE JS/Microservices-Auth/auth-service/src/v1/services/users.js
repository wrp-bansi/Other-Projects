
const UserRole = require("../../../../users-service/src/v1/models/userRole");
const userLogin = require("../../../../users-service/src/v1/models/users");

async function getOneUser(whereParams) {
  const user = await userLogin.findOne({ where: whereParams, include: {
    model: UserRole,
    as: 'role',
    attributes: ['name']
  } });
  if (!user) {
    throw new Error("User Not found")
  } else {
    return user
  }
}

async function updateUser(updateParams, userData) {
  const [data] = await userLogin.update(userData, {
    where: updateParams,
  });
  if (data === 0) {
    throw new Error("User not found");
  }
  return { msg: "User updated successfully" };
}

module.exports = { getOneUser, updateUser }