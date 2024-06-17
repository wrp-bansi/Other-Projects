const Permission = require('../models/permission');

// Get Permissions with Pagination
async function getPermissionwithpagination(whereParams, otherdata) {
  const data = await Permission.findAndCountAll({
    ...whereParams,
    ...otherdata,
  });

  // If no roles found, throw an error
  if (!data || data.rows.length === 0) {
    return { count: 0, rows: [] };
  }

  return data;
}

// Get Permissions without Pagination
async function getAllPermission(whereParams) {
  const data = await Permission.findAll({ where: whereParams });

  return data;
}

// Get Chilldren of Permissions
async function getSubItems() {
  const subItems = await Permission.findAll({
    attributes: ['permissionId', 'name', 'parent'],
  });
  return subItems;
}

// Create Permission
async function createPermission(permissionData) {
  const permission = await Permission.create(permissionData);
  if (permission) {
    return permission;
  }
  throw new Error('Permission not created');
}

// Get One Permission
async function getOnePermission(whereParams) {
  const permission = await Permission.findOne({ where: whereParams });
  return permission;
}

// Update Permission
async function updatePermission(updateParams, permissionData) {
  // Check if the permission exists
  const existingPermission = await getOnePermission(updateParams);
  if (!existingPermission) {
    throw new Error('Permission not found');
  }

  // Permission exists, proceed with the update
  const [data] = await Permission.update(permissionData, {
    where: updateParams,
  });

  if (data === 0) {
    throw new Error('Failed to update permission');
  }

  return { msg: 'Permission updated successfully' };
}

// Delete Permission
async function deletePermission(whereParams) {
  const data = await Permission.destroy({ where: whereParams });
  if (data === 0) {
    throw new Error('Permission not found');
  }
  return { msg: 'Permission deleted successfully' };
}

// Assign Permission To Children
async function assignPermissionsToChildren(parentId, childId) {
  // Find all child permissions of the parent
  const children = await Permission.findAll({ where: { parent: parentId } });

  // Assign the new permission to each child
  const promises = children.map((child) => Permission.create({
    name: child.name,
    parent: childId, // Assign the new child ID as the parent
  }));

  // Execute all promises
  await Promise.all(promises);
}


module.exports = {
  getAllPermission, getSubItems, createPermission, updatePermission, deletePermission, getPermissionwithpagination, assignPermissionsToChildren
};
