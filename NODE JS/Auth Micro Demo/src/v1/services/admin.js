const adminLogin = require("../models/admin");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../helpers/logger-helper");



// async function findByKeyadmin(fieldKey, fieldValue) {
//   const data = await adminLogin.findOne({ where: { [fieldKey]: fieldValue } });
//   if (!data) {
//     throw new Error("Not found")
//   } else {
//     return data
//   }
// }

// async function findByKeyrole(fieldKey, fieldValue) {
//   const data = await role.findOne({ where: { [fieldKey]: fieldValue } });
//   if (!data) {
//     throw new Error("Not found")
//   } else {
//     return data
//   }
// }

// async function hashPassword(password) {
//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(password, salt);
// }
// module.exports = { findByKeyadmin, findByKeyrole, hashPassword }


// async function updateAdmin(adminId, dataToUpdate) {
//   const admin = await adminLogin.findByPk(adminId);
//   if (!admin) {
//     throw new Error("Admin not found");
//   }

//   // Update admin information
//   await admin.update(dataToUpdate);

//   return admin;
// }


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

async function getAdmin(whereParams) {
  const admin = await adminLogin.findOne({ where: whereParams });
  if (admin) {
    throw new Error("Admin already created, please login");
  } else {
    return admin;
  }
}

async function updateAdminLoginWithToken(whereParams, xApiKey, token) {
  await adminLogin.update(
    {
      lastLoginAt: new Date(),
      tokenGeneratedAt: new Date(),
      xApiKey,
      token,
      tokenExpireAt: global.datetime.plusHourDate(global.env.TOKEN_EXPIRY_HOUR),
    },
    { where: whereParams }
  );
}

async function createAdmin(email, password, firstName, lastName, mobile, role) {

  const admin = await adminLogin.create({
    email,
    password,
    firstName,
    lastName,
    mobile,
    role,
  });

}

module.exports = { getSingleAdmin, updateAdminLoginWithToken, createAdmin,getAdmin };


