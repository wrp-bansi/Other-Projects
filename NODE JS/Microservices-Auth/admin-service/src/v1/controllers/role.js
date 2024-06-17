const { Op } = require('sequelize');
const logger = require('../helpers/logger-helper');
const {
  getSingleRole, getAllRole, createRole, updateRole, deleteRole, getRolewithpagination,
} = require('../services/role');

const roleApi = {

  // Get Role with Pagination
  getAllRolewithpagination: async (req, res) => {
    try {
      const {
        orderBy = 'roleId', order = 'DESC', search = '', isDownload = false, filter = {},
      } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      const whereClause = {
        ...filter,
        [Op.or]: {
          name: { [Op.like]: `%${search}%` },
        },
      };

      // Get roles with pagination and apply filter
      const data = await getRolewithpagination(whereClause, {
        attributes: ['roleId', 'name', 'permission'],
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return all roles without pagination
        const allRoles = await getAllRole(whereClause);
        responseData = { error: false, msg: 'Show All Roles', data:{rows: allRoles} };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: 'Show All Roles with Pagination',
          data: {
            count: data.count,
            rows: data.rows,
            perPage,
            currentPage,
            totalPages: Math.ceil(data.count / perPage),
          },
        };
      }

      return res.status(200).json(responseData);
    } catch (error) {
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Get Role without Pagination
  getAllRoles: async (req, res) => {
    try {
      const data = await getAllRole();
      res.status(200).json({ error: false, msg: 'Show all Role', data:{rows:data} });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Get One Role
  getRoleById: async (req, res) => {
    const { roleId } = req.params;
    try {
      const data = await getSingleRole({ roleId });
      res.status(200).send({ error: false, msg: 'Show Role by id', data });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Create Role
  createRole: async (req, res) => {
    const { name, permission } = req.body;
    const roleData = { name, permission };
    try {
      await createRole(roleData);
      res.status(200).send({ error: false, msg: 'Role Created successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Update Role
  updateRole: async (req, res) => {
    const { roleId } = req.params;

    const updateData = req.body;
    try {
      await updateRole({ roleId }, updateData);
      res.status(200).send({ error: false, msg: 'Role updated successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // delete Role
  deleteRole: async (req, res) => {
    const { roleId } = req.params;
    try {
      await deleteRole({ roleId });
      res.status(200).send({ error: false, msg: 'Role deleted successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Bulk delete roles
  bulkDeleteRoles: async (req, res) => {
    const { roleIds } = req.body;
    try {
      // Perform bulk delete operation
      await deleteRole({ roleId: { [Op.in]: roleIds } });

      // Return success response
      return res.status(200).json({ error: false, msg: 'Roles deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

};

module.exports = roleApi;
