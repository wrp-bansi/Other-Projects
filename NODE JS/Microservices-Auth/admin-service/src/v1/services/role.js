const Role = require('../models/role');

// Get Role with Pagination
async function getRolewithpagination(whereParams, otherdata) {
  const data = await Role.findAndCountAll({
    where: whereParams,
    ...otherdata,
  });

  // If no roles found, throw an error
  if (!data || data.rows.length === 0) {
    return { count: 0, rows: [] };
  }

  return data;
}

// Get Role without Pagination
async function getAllRole() {
  const data = await Role.findAll();

  if (!data || data.length === 0) {
    throw new Error('Role not found');
  }

  return data;
}

// Get One Role
const getSingleRole = async (whereParams) => {
  const data = await Role.findOne({ where: whereParams });
  if (!data) {
    throw new Error('Role not found');
  }
  return data;
};

// Create Role
async function createRole(roleData) {
  const roleCreate = await Role.create(roleData);
  if (roleCreate) {
    return roleCreate;
  }
  throw new Error('Role not created');
}

// Update Role
async function updateRole(updateParams, updateData) {
  // Check if the user exists
  const existingRole = await getSingleRole(updateParams);
  if (!existingRole) {
    throw new Error('Role not found');
  }

  // Role exists, proceed with the update
  const [data] = await Role.update(updateData, {
    where: updateParams,
  });

  if (data === 0) {
    throw new Error('Failed to update role');
  }

  return { msg: 'Role updated successfully' };
}

// delete Role
async function deleteRole(deleteParams) {
  const data = await Role.destroy({ where: deleteParams });
  if (data === 0) {
    throw new Error('Role not found');
  }
  return { msg: 'Role deleted successfully' };
}

module.exports = {
  getSingleRole, getAllRole, createRole, updateRole, deleteRole, getRolewithpagination,
};
