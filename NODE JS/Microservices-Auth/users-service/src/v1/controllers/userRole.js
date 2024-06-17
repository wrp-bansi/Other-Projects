const { Op } = require('sequelize');
const logger = require('../helpers/logger-helper');
const {getSingleUserRole, getAllUserRole, createUserRole, updateUserRole, deleteUserRole, getUserRolewithpagination} = require('../services/userRole');

const userRoleApi = {

  // Get User Role with Pagination
  getAllUserRolewithpagination: async (req, res) => {
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
      const data = await getUserRolewithpagination(whereClause, {
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return all User roles without pagination
        const allRoles = await getAllUserRole(whereClause);
        responseData = { error: false, msg: 'Show All User Roles', data:{rows: allRoles} };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: 'Show All User Roles with Pagination',
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

  // Get User Role without Pagination
  getAllUserRoles: async (req, res) => {
    try {
      const data = await getAllUserRole();
      res.status(200).json({ error: false, msg: 'Show all User Role', data:{rows:data} });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Get One User Role
  getUserRoleById: async (req, res) => {
    const { roleId } = req.params;
    try {
      const data = await getSingleUserRole({ roleId });
      res.status(200).send({ error: false, msg: 'Show User Role by id', data });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Create User Role
  createUserRole: async (req, res) => {
    const { name} = req.body;
    const roleData = { name};
    try {
      await createUserRole(roleData);
      res.status(200).send({ error: false, msg: 'User Role Created successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Update User Role
  updateUserRole: async (req, res) => {
    const { roleId } = req.params;

    const updateData = req.body;
    try {
      await updateUserRole({ roleId }, updateData);
      res.status(200).send({ error: false, msg: 'User Role updated successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // delete User Role
  deleteUserRole: async (req, res) => {
    const { roleId } = req.params;
    try {
      await deleteUserRole({ roleId });
      res.status(200).send({ error: false, msg: 'User Role deleted successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Bulk delete User roles
  bulkDeleteUserRoles: async (req, res) => {
    const { roleIds } = req.body;
    try {
      // Perform bulk delete operation
      await deleteUserRole({ roleId: { [Op.in]: roleIds } });

      // Return success response
      return res.status(200).json({ error: false, msg: 'User Roles deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

};

module.exports = userRoleApi;
