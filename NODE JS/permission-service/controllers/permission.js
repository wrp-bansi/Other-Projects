
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
          children,
        };
      });

      if (mergedData.length === 0) {
        return res.status(200).json({ error: true, msg: "Permissions not found" });
      }

      const total_pages = Math.ceil(data.count / per_page);
      const result = {
        per_page: per_page,
        current_page: current_page,
        total_pages: total_pages,
        total_records: data.count,
        data: mergedData,
      };

      return res.status(200).send({ error: false, msg: "Permissions retrieved successfully!", result });
    } catch (error) {
      return res.status(400).send({ error: true, msg: error.message });
    }
  },


//   getAllPermissions :async (req, res) => {
//     try {
//         const { order_by = "permissionId", order = "DESC" } = req.query;
//         const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

//         const data = await getPermissionwithpagination({}, {
//             attributes: ['permissionId', 'name', 'parent'], // Adjusted attribute syntax
//             offset,
//             limit: per_page,
//             order: [[order_by, order]],
//         });

//         const subItems = await getSubItems();
//         const mergedData = data.rows.map((item) => {
//             const children = subItems.filter(
//                 (subItem) => subItem.parent === item.permissionId
//             );


//         });

//         if (mergedData.length === 0) {
//             return res.status(200).json({ error: true, msg: "Permission Not found" });
//         }

//            if (mergedData) {
//         const totalPage = Math.ceil(totalCount / perPage);
//         return res.status(200).send({
//           error: false,
//           msg: "Show Permissions list",
//           data: mergedData,
//           perPage,
//           currentPage,
//           totalPage,
//         });
//       }
//     } catch (error) {
//       logger.error(error);
//       return res
//         .status(500)
//         .json({ error: true, msg: "Internal Server Error" });
//     }
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

