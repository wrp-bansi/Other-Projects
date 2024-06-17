const adminLogin = require('../models/admin');

// Get admin with Pagination
async function getAdminiwithpagination(whereParams, otherdata) {
  const data = await adminLogin.findAndCountAll({
    ...whereParams,
    ...otherdata,
  });

  // If no roles found, throw an error
  if (!data || data.rows.length === 0) {
    return { count: 0, rows: [] };
  }

  return data;
}

// Get Admin without Pagination
async function getAllAdmins(whereParams) {
  const data = await adminLogin.findAll({ where: whereParams });

  return data;
}
// check this admin is in databse or not
async function getAdmin(whereParams) {
  const admin = await adminLogin.findOne({ where: whereParams });
  if (admin) {
    throw new Error('Admin already created, please login');
  } else {
    return admin;
  }
}

//Get one Admin
async function getSingleAdmin(whereParams) {
  const admin = await adminLogin.findOne({ where: whereParams });
  if (!admin) {
    throw new Error("Admin Not found")
  } else if (!admin.role) {
    throw new Error("No role assigned to this Admin")
  } else {
    return admin
  }
}

//create Admin
async function createAdmin(adminData) {
  const adminCreate = await adminLogin.create(adminData);
  if (adminCreate) {
    return adminCreate;
  }
  throw new Error('admin not created');
}

//Update Admin
async function updateAdmin(updateParams, adminData) {
  const admin = await adminLogin.findOne({ where: updateParams });

  if (!admin) {
    throw new Error('Admin not found');
  }

  // Update the admin's account status
  await admin.update(adminData);

  return admin;
}

//Delete Admin
async function deleteAdmin(deleteParams) {
  const data = await adminLogin.destroy({ where: deleteParams });
  if (data === 0) {
    throw new Error('Admin not found');
  }
  return { msg: 'Admin deleted successfully' };
}

module.exports = {
  createAdmin, getAdmin, updateAdmin, deleteAdmin,getSingleAdmin,getAdminiwithpagination,getAllAdmins
};
