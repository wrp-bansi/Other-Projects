const { Op } = require('sequelize');
const logger = require('../helpers/logger-helper');
const {getAllPermission, getSubItems, createPermission, updatePermission, deletePermission, getPermissionwithpagination} = require('../services/permission');

const permissionApi = {

  // Get Permissions without Pagination
  getPermissions: async (req, res) => {
    try {
      // Fetch all top-level permissions
      const data = await getAllPermission();

      // Fetch all sub-items
      const subItems = await getSubItems();

      // Merging data to include sub-items for each top-level permission
      const mergedData = data.map((item) => {
        const children = subItems.filter(
          (subItem) => subItem.parent === item.permissionId,
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

      // Filter out parent permissions without children
      const filteredData = mergedData.filter(item => item.parent.children.length > 0);

      if (!filteredData) {
        return res.status(200).json({ error: true, msg: 'Permission Not found' });
      }

      return res
        .status(200)
        .json({ error: false, msg: 'Show all Permission', data:{rows:filteredData} });
    } catch (error) {
      logger.error(error);
      return res
        .status(400)
        .json({ error: true, msg: error.message });
    }
  },

  // Get Permissions with Pagination
  getAllPermissionswithPagination: async (req, res) => {
    try {
      // Extract query parameters
      const {
        orderBy = 'permissionId', order = 'DESC', search = '', filter = {}, isDownload = false,
      } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      // Define where clause for filtering
      const whereClause = {
        ...filter,
        [Op.or]: {
          name: { [Op.like]: `%${search}%` },
          parent: { [Op.like]: `%${search}%` },
        },
      };

      // Fetch permissions with pagination
      const { rows, count } = await getPermissionwithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      // Fetch sub-items for all permissions
      const subItems = await getSubItems();

      // Merge permissions with their children
      const mergedData = rows.map((item) => ({
        permissionId: item.permissionId,
        name: item.name,
        parent: item.parent,
        children: subItems.filter((subItem) => subItem.parent === item.permissionId),
      }));

      let responseData;

      if (isDownload === 'true') {
        // For download, return mergedData directly
        const allPermission = await getAllPermission(whereClause);
        responseData = { error: false, msg: 'Show All Permissions', data:{rows: allPermission} };
      } else {
        // For pagination, return paginated data
        responseData = {
          error: false,
          msg: 'Show All Permissions With Pagination',
          data: {
            count,
            rows: mergedData,
            perPage,
            currentPage,
            totalPages: Math.ceil(count / perPage),
          },
        };
      }
      // Send response
      return res.status(200).json(responseData);
    } catch (error) {
      logger.error(error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Get One Permission
  getPermissionById: async (req, res) => {
    const { permissionId } = req.params;
    try {
      const data = await getAllPermission({ permissionId });

      const subItems = await getSubItems();

      // Merging data
      const mergedData = data.map((item) => {
        subItems.filter(
          (subItem) => subItem.parent === item.permissionId,
        );
        return {
          parent: {
            permissionId: item.permissionId,
            name: item.name,
            parent: item.parent,
          },
        };
      });

      return res
        .status(200)
        .send({ error: false, msg: 'Show Permission by id', data: mergedData });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ msg: error.message });
    }
  },

  // Get Parent Permission
  getParentPermissions: async (req, res) => {
    try {
      const data = await getAllPermission({ parent: 0 });

      return res
        .status(200)
        .json({ error: false, msg: 'Show Parent Permission', data:{rows:data} });
    } catch (error) {
      logger.error(error);
      return res
        .status(400)
        .json({ msg: error.message });
    }
  },

  // Create Permission
  createPermission: async (req, res) => {
    const { name, parent } = req.body;
    const permissionData = { name, parent };
    try {
      await createPermission(permissionData);
      res.status(200).send({ error: false, msg: 'Permission Created successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Update Permission
  updatePermission: async (req, res) => {
    const { permissionId } = req.params;
    const permissionData = req.body;
    try {
      await updatePermission({ permissionId }, permissionData);

      res
        .status(200)
        .send({ error: false, msg: 'Permission updated successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Delete Permission
  deletePermission: async (req, res) => {
    const { permissionId } = req.params;
    try {
      await deletePermission({ permissionId });
      res
        .status(200)
        .send({ error: false, msg: 'Permission deleted successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Bulk-Delete Permission
  bulkDeletePermissions: async (req, res) => {
    const { permissionIds } = req.body;
    try {
      // Perform bulk delete operation
      await deletePermission({ permissionId: { [Op.in]: permissionIds } });

      // Return success response
      return res.status(200).json({ error: false, msg: 'Permissions deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

};

module.exports = permissionApi;
