const adminLogin = require("../../../../admin-service/src/v1/models/admin");


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

async function updateAdminLoginWithToken(updateParams, updateData) {
  const [data] = await adminLogin.update(updateData, {
    where: updateParams,
  });
  if (data === 0) {
    throw new Error("admin not found");
  }
  return { message: "admin updated successfully" };
}


module.exports = { getSingleAdmin, updateAdminLoginWithToken };


