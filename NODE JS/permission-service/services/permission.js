const Permission = require("../models/permission");



async function getPermissionwithpagination (whereParams,otherdata) {
  const data = await Permission.findAndCountAll({
    ...whereParams,
        ...otherdata
});

    // If no roles found, throw an error
    if (!data || data.rows.length === 0) {
      throw new Error("No Roles found");
    }

    return data;
  }

async function getAllPermission(whereParams) {

    const data = await Permission.findAll({ where: whereParams });

    if (!data || data.length === 0) {
      throw new Error("Permission not found");
    }

    return data;
  }



async function getSubItems() {

    const subItems = await Permission.findAll({
      attributes: ["permissionId", "name", "parent"],
    });
    return subItems;
  }


  async function createPermission(permissionData) {

    const permission = await Permission.create(permissionData);
    if(permission){
      return permission;
    }else{
      throw new Error("Permission not created");
    }

  }

  async function updatePermission(whereParams, permissionData) {
    const [data] = await Permission.update(permissionData, {
      where: whereParams,
    });
    if (data === 0) {
        throw new Error("Permission not found");
    }
    return { message: "Permission updated successfully" };
}

async function deletePermission(whereParams) {
  const data = await Permission.destroy({ where: whereParams })
  if (data === 0) {
      throw new Error("Permission not found");
  }
  return { message: "Permission deleted successfully" };
}






module.exports = {  getAllPermission,getSubItems,createPermission,updatePermission,deletePermission,getPermissionwithpagination };



