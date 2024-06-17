const userRole = require('../models/userRole');

// Get user Role with Pagination
async function getUserRolewithpagination(whereParams, otherdata) {
  const data = await userRole.findAndCountAll({
    where: whereParams,
    ...otherdata,
  });

  // If no user Roles found, throw an error
  if (!data || data.rows.length === 0) {
    return { count: 0, rows: [] };
  }

  return data;
}

// Get user Roles without Pagination
async function getAllUserRole() {
  const data = await userRole.findAll();

  if (!data || data.length === 0) {
    throw new Error('User Role not found');
  }

  return data;
}

// Get One User Role
const getSingleUserRole = async (whereParams) => {
  const data = await userRole.findOne({ where: whereParams });
  if (!data) {
    throw new Error('User Role not found');
  }
  return data;
};

// Create User Role
async function createUserRole(roleData) {
  const roleCreate = await userRole.create(roleData);
  if (roleCreate) {
    return roleCreate;
  }
  throw new Error('User Role not created');
}

// Update User Role
async function updateUserRole(updateParams, updateData) {
  // Check if the User Role exists
  const existingRole = await getSingleUserRole(updateParams);
  if (!existingRole) {
    throw new Error('Role not found');
  }

  await existingRole.update(updateData);
  return existingRole;
}

// delete User Role
async function deleteUserRole(deleteParams) {
  const data = await userRole.destroy({ where: deleteParams });
  if (data === 0) {
    throw new Error('User Role not found');
  }
  return { msg: 'User Role deleted successfully' };
}

module.exports = {
  getSingleUserRole, getAllUserRole, createUserRole, updateUserRole, deleteUserRole, getUserRolewithpagination,
};
