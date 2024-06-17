// const Role = require("../models/role");
// const logger = require("../helpers/logger-helper");

// // Service functions
// var roleApi = {
//   getAllRoles: async (req, res) => {
//     try {
//       const data = await Role.findAll({ attributes: ["roleId", "name", "permission", "createdAt"] });
//       if (!data) {
//         res.status(200).json({ error: true, msg: "No Role found" });
//       }
//       res.status(200).json({ error: false, msg: "Show all Role", data });
//     } catch (error) {
//       logger.error(error);
//       res.status(400).json({ error: true, msg: "Internal Server Error" });
//     }
//   },

//   getRoleById: async (req, res) => {
//     const { nId } = req.params;
//     try {
//       const data = await Role.findOne({
//         where: { roleId: nId },
//       });
//       if (!data) {
//         return res.status(200).send({ error: true, msg: "Role not found" });
//       }
//       res.status(200).send({ error: false, msg: "Show Role by id", data });
//     } catch (error) {
//       logger.error(error);
//       res.status(400).send({ error: true, msg: "Internal Server Error" });
//     }
//   },

//   // getRoleByIdPermission: async (req, res) => {
//   //   // const { nId } = req.params;
//   //   try {
//   //     // const data = await Role.findOne({
//   //     //   where: { nid: nId },
//   //     // });

//   //     const roles = await Role.findAll();
//   //     if (!roles) {
//   //       return res.status(200).send({ error: true, msg: "Role not found" ,roles });
//   //     }
//   //     const rolePermissions = roles.map(role => {
//   //       return {
//   //         roleId: role.roleId,
//   //         name: role.name,
//   //         permissions: role.permission // This will already be an array due to the getter in the model
//   //       };
//   //     });

//   //     res.status(200).send({ error: false, msg: "Show Role by id", rolePermissions });
//   //   } catch (error) {
//   //     logger.error(error);
//   //     res.status(400).send({ error: true, msg: "Internal Server Error" });
//   //   }
//   // },

//   createRole: async (req, res) => {
//     const { name, permission } = req.body;
//     const postData = { name, permission };
//     try {
//       const data = await Role.create(postData);
//       res.status(200).send({ error: false, msg: "Create Role", data });
//     } catch (error) {
//       logger.error(error);
//       res.status(400).send({ error: true, msg: "Internal Server Error" });
//     }
//   },

//   updateRole: async (req, res) => {
//     const { nId } = req.params;
//     const { name, permission, type } = req.body;
//     const updateData = { name, permission, type };
//     try {
//       const [data] = await Role.update(updateData, {
//         where: { roleId: nId },
//       });
//       if (data === 0) {
//         return res.status(200).send({ error: true, msg: "Role not found" });
//       }
//       res.status(200).send({ error: false, msg: "Role updated successfully" });
//     } catch (error) {
//       logger.error(error);
//       res.status(400).send({ error: true, msg: "Internal Server Error" });
//     }
//   },

//   deleteRole: async (req, res) => {
//     const { nId } = req.params;
//     try {
//       const data = await Role.destroy({ where: { roleId: nId } });
//       if (data === 0) {
//         return res.status(200).send({ error: true, msg: "Role not found" });
//       }
//       res.status(200).send({ error: false, msg: "Role deleted successfully" });
//     } catch (error) {
//       logger.error(error);
//       res.status(400).send({ error: true, msg: "Internal Server Error" });
//     }
//   },

// };

// module.exports = roleApi;


 const Role = require("../models/role");

const logger = require("../helpers/logger-helper");
const { getSingleRole, getAllRole, createRole, updateRole, deleteRole} = require("../services/role");


var roleApi = {

  getAllRolewithpagination: async (req, res) => {
    try {
      const { order_by = "roleId", order = "DESC" } = req.query;
    const { offset, per_page, current_page } =
      global.common.getPaginationParams(req.query);

      const data = await Role.findAndCountAll({
        attributes: [
          'roleId', 'name', 'permission', 'createdAt'
        ],
        offset,
        limit: per_page,
        order: [[order_by, order]],
      });

      if (!data || data.length === 0) {
        return res.status(400).send({ error: true, msg: "No Role found" });
      }
      const response = {
        error: false,
        data: {
            count: data.count,
            rows: data.rows,
            per_page,
            current_page,
            total_pages: Math.ceil(data.count / per_page)
        }
    };

    return res.status(200).json(response);
    } catch (error) {
      res.status(400).send({ error: true, msg:error.message });
    }
  },

  getAllRoles: async (req, res) => {
    try {
      const data = await getAllRole();
      res.status(200).json({ error: false, msg: "Show all Role", data });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message});
    }
  },
  getRoleById: async (req, res) => {
    const { roleId } = req.params;

    try {
      const data = await getSingleRole({'roleId': roleId});
      res.status(200).send({ error: false, msg: "Show Role by id", data });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // getRoleByIdPermission: async (req, res) => {
  //   // const { nId } = req.params;
  //   try {
  //     // const data = await Role.findOne({
  //     //   where: { nid: nId },
  //     // });

  //     const roles = await Role.findAll();
  //     if (!roles) {
  //       return res.status(200).send({ error: true, msg: "Role not found" ,roles });
  //     }
  //     const rolePermissions = roles.map(role => {
  //       return {
  //         roleId: role.roleId,
  //         name: role.name,
  //         permissions: role.permission // This will already be an array due to the getter in the model
  //       };
  //     });

  //     res.status(200).send({ error: false, msg: "Show Role by id", rolePermissions });
  //   } catch (error) {
  //     logger.error(error);
  //     res.status(400).send({ error: true, msg: "Internal Server Error" });
  //   }
  // },

  createRole: async (req, res) => {
    const { name, permission } = req.body;
    const roleData = { name, permission };
    try {
      const data = await createRole(roleData)
      res.status(200).send({ error: false, msg: "Create Role", data });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true,msg:error.message });
    }
  },

  updateRole: async (req, res) => {
    const { roleId } = req.params;

    const updateData = req.body;
    try {
      const data = await updateRole({"roleId": roleId}, updateData );
      res.status(200).send({ error: false, msg: "Role updated successfully" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true,msg:error.message });
    }
  },

  deleteRole: async (req, res) => {
    const { roleId } = req.params;
    try {
      const data = await deleteRole({"roleId": roleId} );
      res.status(200).send({ error: false, msg: "Role deleted successfully" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true,msg:error.message });
    }
  },
};

module.exports = roleApi;

