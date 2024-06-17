// const Permission = require("../models/permission");
// const logger = require("../helpers/logger-helper");
// const { Op } = require("sequelize");

// // Service functions
// var permissionApi = {
//   // Get Permisttion Without Pagination
//   // getPermissions: async (req, res) => {
//   //   try {
//   //     const data = await Permission.findAll({
//   //       attributes: ["permissionId", "name", "parent"],
//   //       where: { parent: 0 },
//   //     });
//   //     const subItems = await Permission.findAll({
//   //       attributes: ["permissionId", "name", "parent"],
//   //     });

//   //     // Merging data
//   //     const mergedData = data.map((item) => {
//   //       const children = subItems.filter(
//   //         (subItem) => subItem.parent === item.permissionId
//   //       );
//   //       return {
//   //         parent: {
//   //           permissionId: item.permissionId,
//   //           name: item.name,
//   //           parent: item.parent,
//   //           children,
//   //         },
//   //       };
//   //     });

//   //     if (!data) {
//   //       return res
//   //         .status(200)
//   //         .json({ error: true, msg: "Permission Not found" });
//   //     }
//   //     return res
//   //       .status(200)
//   //       .json({ error: false, msg: "Show all Permission", data: mergedData });
//   //   } catch (error) {
//   //     logger.error(error);
//   //     return res
//   //       .status(400)
//   //       .json({ error: true, msg: "Internal Server Error" });
//   //   }
//   // },

//   // Get Permisttion With Pagination


//   // getAllPermissions: async (req, res) => {
//   //   try {
//   //     const { search, orderBy = "permissionId", order = "DESC" } = req.query;
//   //     const { offset, perPage, currentPage } =
//   //       global.common.getPaginationParams(req.query);
//   //     let searchCriteria = {};

//   //     if (search) {
//   //       searchCriteria = {
//   //         [Op.or]: [
//   //           { name: { [Op.like]: `%${search}%` } },
//   //           { parent: { [Op.like]: `%${search}%` } },
//   //         ],
//   //       };
//   //     }
//   //     const data = await Permission.findAll({
//   //       attributes: ["permissionId", "name", "parent"],
//   //       where: { parent: 0, ...searchCriteria },
//   //       offset: offset,
//   //       limit: perPage,
//   //       order: [[orderBy, order]],
//   //     });
//   //     console.log("data", data);
//   //     const subItems = await Permission.findAll({
//   //       attributes: ["permissionId", "name", "parent"],
//   //     });
//   //     console.log("subItems", subItems);
//   //     // Get total count for pagination
//   //     const totalCount = await Permission.count({
//   //       where: { parent: 0, ...searchCriteria },
//   //     });
//   //     console.log("totalCount", totalCount);
//   //     // Merging data
//   //     const mergedData = data.map((item) => {
//   //       const children = subItems.filter(
//   //         (subItem) => subItem.parent === item.permissionId
//   //       );
//   //       return {
//   //         parent: {
//   //           permissionId: item.permissionId,
//   //           name: item.name,
//   //           parent: item.parent,
//   //           children,
//   //         },
//   //       };
//   //     });

//   //     if (mergedData.length === 0) {
//   //       return res
//   //         .status(200)
//   //         .json({ error: true, msg: "Permission Not found" });
//   //     }
//   //     if (mergedData) {
//   //       const totalPage = Math.ceil(totalCount / perPage);
//   //       return res.status(200).send({
//   //         error: false,
//   //         msg: "Show Permissions list",
//   //         data: mergedData,
//   //         perPage,
//   //         currentPage,
//   //         totalPage,
//   //       });
//   //     }
//   //   } catch (error) {
//   //     logger.error(error);
//   //     return res
//   //       .status(500)
//   //       .json({ error: true, msg: "Internal Server Error" });
//   //   }
//   // },

//   // Get Permission One
//   getPermissionById: async (req, res) => {
//     const { nId } = req.params;
//     try {
//       const data = await Permission.findAll({
//         attributes: ["permissionId", "name", "parent"],
//         where: { parent: 0, permissionId: nId },
//       });
//       const subItems = await Permission.findAll({
//         attributes: ["permissionId", "name", "parent"],
//       });

//       // Merging data
//       const mergedData = data.map((item) => {
//         const children = subItems.filter(
//           (subItem) => subItem.parent === item.permissionId
//         );
//         return {
//           parent: {
//             permissionId: item.permissionId,
//             name: item.name,
//             parent: item.parent,
//             children,
//           },
//         };
//       });

//       if (!data) {
//         return res
//           .status(200)
//           .send({ error: true, msg: "Permission not found" });
//       }
//       res
//         .status(200)
//         .send({ error: false, msg: "Show Permission by id", data: mergedData });
//     } catch (error) {
//       logger.error(error);
//       res.status(400).send({ error: true, msg: "Internal Server Error" });
//     }
//   },

//   // Get Parent Permission
//   getParentPermissions: async (req, res) => {
//     try {
//       const data = await Permission.findAll({
//         attributes: ["permissionId", "name", "parent"],
//         where: { parent: 0 },
//       });

//       if (!data) {
//         return res
//           .status(200)
//           .json({ error: true, msg: "No Permission found" });
//       }
//       return res
//         .status(200)
//         .json({ error: false, msg: "Show Parent Permission", data: data });
//     } catch (error) {
//       logger.error(error);
//       return res
//         .status(400)
//         .json({ error: true, msg: "Internal Server Error" });
//     }
//   },

//   // Create Permission
//   createPermission: async (req, res) => {
//     const { name, parent } = req.body;
//     const postData = { name, parent };
//     try {
//       const data = await Permission.create(postData);
//       res.status(200).send({ error: false, msg: "Create Permission", data });
//     } catch (error) {
//       logger.error(error);
//       res.status(400).send({ error: true, msg: "Internal Server Error" });
//     }
//   },

//   updatePermission: async (req, res) => {
//     const { nId } = req.params;
//     const userData = req.body;
//     try {
//       const [data] = await Permission.update(userData, {
//         where: { permissionId: nId },
//       });
//       if (data === 0) {
//         return res
//           .status(200)
//           .send({ error: true, msg: "Permission not found" });
//       }
//       res
//         .status(200)
//         .send({ error: false, msg: "Permission updated successfully" });
//     } catch (error) {
//       logger.error(error);
//       res.status(400).send({ error: true, msg: "Internal Server Error" });
//     }
//   },

//   deletePermission: async (req, res) => {
//     const { nId } = req.params;
//     try {
//       const data = await Permission.destroy({ where: { permissionId: nId } });
//       if (data === 0) {
//         return res
//           .status(200)
//           .send({ error: true, msg: "Permission not found" });
//       }
//       res
//         .status(200)
//         .send({ error: false, msg: "Permission deleted successfully" });
//     } catch (error) {
//       logger.error(error);
//       res.status(400).send({ error: true, msg: "Internal Server Error" });
//     }
//   },

// };

// module.exports = permissionApi;


const Permission = require("../models/permission");
const logger = require("../helpers/logger-helper");
const { Op } = require("sequelize");
const {  getAllPermission, getSubItems,createPermission, updatePermission, deletePermission, getPermissionwithpagination} = require("../services/permission");

var permissionApi = {

    // Get Permisttion Without Pagination
    getPermissions: async (req, res) => {
      try {
        const data = await getAllPermission({ "parent": 0});
        const subItems = await getSubItems();

        // Merging data
        const mergedData = data.map((item) => {
          const children = subItems.filter(
            (subItem) => subItem.parent === item.permissionId
          );
          return {
            parent: {
              permissionId: item.permissionId,
              name: item.name,
              parent: item.parent,
              children,
            },
          };
        });

        if (!data) {
          return res
            .status(200)
            .json({ error: true, msg: "Permission Not found" });
        }
        return res
          .status(200)
          .json({ error: false, msg: "Show all Permission", data: mergedData });
      } catch (error) {
        logger.error(error);
        return res
          .status(400)
          .json({ error: true, msg: error.message });
      }
    },


  // Get Permisttion With Pagination
  getAllPermissions :async (req, res) => {
    try {
      const { orderBy = "permissionId", order = "DESC", search = "", filter = {} } = req.query;
      const { offset, per_page, current_page } = global.common.getPaginationParams(req.query);

      const whereClause = {
        ...filter,
        [Op.or]: {
          name: { [Op.like]: `%${search}%` },
          parent: { [Op.like]: `%${search}%` },
        },
      };

      const data = await getPermissionwithpagination(
        {
          where: whereClause,
          offset,
          limit: per_page,
          order: [[orderBy, order]],
        }
      );

      // Assuming `getSubItems` is defined and implemented
      const subItems = await getSubItems();

      // Merging data
      const mergedData = data.rows.map((item) => {
        const children = subItems.filter((subItem) => subItem.parent === item.permissionId);
        return {
          permissionId: item.permissionId,
          name: item.name,
          parent: item.parent,
        };
      });

      if (mergedData.length === 0) {
        return res.status(200).json({ error: true, msg: "Permissions not found" });
      }

      const total_pages = Math.ceil(data.count / per_page);
      const response = {
        error: false,
        data: {
            count: data.count,
            rows: mergedData,
            per_page,
            current_page,
            total_pages
        }
    };

    return res.status(200).json(response)
    } catch (error) {
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  // getAllPermissions: async (req, res) => {
  //   try {
  //     const { search, orderBy = "permissionId", order = "DESC" } = req.query;
  //     const { offset, perPage, currentPage } =
  //       global.common.getPaginationParams(req.query);
  //     let searchCriteria = {};

  //     if (search) {
  //       searchCriteria = {
  //         [Op.or]: [
  //           { name: { [Op.like]: `%${search}%` } },
  //           { parent: { [Op.like]: `%${search}%` } },
  //         ],
  //       };
  //     }

  //     const data = await Permission.findAll({
  //       attributes: ["permissionId", "name", "parent"],
  //       where: { parent: 0, ...searchCriteria },
  //       offset: offset,
  //       limit: perPage,
  //       order: [[orderBy, order]],
  //     });

  //     const totalCount = await Permission.count({
  //       where: { parent: 0, ...searchCriteria },
  //     });

  //     const subItems = await Permission.findAll({
  //       attributes: ["permissionId", "name", "parent"],
  //     });

  //     const mergedData = data.map((item) => {
  //       const children = subItems.filter(
  //         (subItem) => subItem.parent === item.permissionId
  //       );
  //       return {
  //         permissionId: item.permissionId,
  //         name: item.name,
  //         parent: item.parent,
  //         children,
  //       };
  //     });

  //     const totalPage = Math.ceil(totalCount / perPage);
  //     console.log("totalPage", totalPage);

  //     return res.status(200).json({
  //       error: false,
  //       msg: "Show Permissions list",
  //       data: mergedData,
  //       totalPage: totalPage,
  //       currentPage,
  //       perPage,
  //     });
  //   } catch (error) {
  //     logger.error(error);
  //     return res
  //       .status(500)
  //       .json({ error: true, msg: "Internal Server Error" });
  //   }
  // },

  // Get Permission One
  getPermissionById: async (req, res) => {
    const { Id } = req.params;
    try {
      const data = await getAllPermission({"permissionId": Id});

      const subItems = await getSubItems()

      // Merging data
      const mergedData = data.map((item) => {
        const children = subItems.filter(
          (subItem) => subItem.parent === item.permissionId
        );
        return {
          parent: {
            permissionId: item.permissionId,
            name: item.name,
            parent: item.parent,
            children,
          },
        };
      });

      return res
        .status(200)
        .send({ error: false, msg: "Show Permission by id", data: mergedData });
    } catch (error) {
      logger.error(error);
      res.status(400).send({msg: error.message});
    }
  },

  // Get Parent Permission
  getParentPermissions: async (req, res) => {
    try {
      const data = await getAllPermission({"parent": 0});

      return res
        .status(200)
        .json({ error: false, msg: "Show Parent Permission", data: data });
    } catch (error) {
      logger.error(error);
      return res
        .status(400)
        .json({ msg:error.message });
    }
  },

  // Create Permission
  createPermission: async (req, res) => {
    const { name, parent } = req.body;
    const permissionData = { name, parent };
    try {
      const data = await createPermission(permissionData);
      res.status(200).send({ error: false, msg: "Create Permission", data });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true,msg:error.message});
    }
  },

  updatePermission: async (req, res) => {
    const { Id } = req.params;
    const permissionData = req.body;
    try {
      const data = await updatePermission({"permissionId": Id}, permissionData)

      res
        .status(200)
        .send({ error: false, msg: "Permission updated successfully" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg:error.message  });
    }
  },

  deletePermission: async (req, res) => {
    const { Id } = req.params;
    try {
      const data = await deletePermission({"permissionId": Id})
      res
        .status(200)
        .send({ error: false, msg: "Permission deleted successfully" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message});
    }
  },
};

module.exports = permissionApi;

