const Role = require("../models/role");


async function getRolewithpagination (whereParams,otherdata) {
  const data = await Role.findAndCountAll({
    where: whereParams,
        ...otherdata
});

    // If no roles found, throw an error
    if (!data || data.rows.length === 0) {
      throw new Error("No Roles found");
    }

    return data;
  }

async function getAllRole() {

  const data = await Role.findAll();

  if (!data || data.length === 0) {
    throw new Error("Role not found");
  }

  return data;
}


const getSingleRole = async (whereParams) => {

  const data = await Role.findOne({ where:whereParams  });
  if (!data) {
    throw new Error("Role not found");
  }
  return data
};

async function createRole(roleData) {

  const roleCreate = await Role.create(roleData);
  if(roleCreate){
    return roleCreate;
  }else{
    throw new Error("Role not created");
  }

}

async function updateRole(updateParams,updateData) {
  console.log("Executing update with Params:", updateParams);
  const [data] = await Role.update(updateData, {
      where: updateParams,
  });
  if (data === 0) {
      throw new Error("Role not found");
  }
  return { message: "Role updated successfully" };
}

async function deleteRole(deleteParams) {
const data = await Role.destroy({ where: deleteParams })
if (data === 0) {
    throw new Error("Role not found");
}
return { message: "Role deleted successfully" };
}

module.exports = { getSingleRole, getAllRole,createRole,updateRole,deleteRole,getRolewithpagination }
