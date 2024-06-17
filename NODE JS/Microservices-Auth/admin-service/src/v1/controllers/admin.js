const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const logger = require('../helpers/logger-helper');
const {getAdmin, createAdmin, updateAdmin, deleteAdmin,getSingleAdmin,getAllAdmins,getAdminiwithpagination,} = require('../services/admin');

const adminApi = {

  // Get all admins without pagination
  getAllAdmins: async (req, res) => {
    try {
      const admins = await getAllAdmins(); // Implement this function to fetch all admins

      if (!admins || admins.length === 0) {
        return res.status(404).json({ error: true, msg: 'No admins found' });
      }

      return res.status(200).json({ error: false, msg: 'Show all admins', data:{rows: admins} });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Get all admins with pagination
  getAllAdminsWithPagination: async (req, res) => {
    try {
      const {
        orderBy = 'adminId',
        order = 'DESC',
        search = '',
        isDownload = false,
        filter = {},
      } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      const whereClause = {
        ...filter,
        [Op.or]: [
          { firstName: { [Op.like]: `%${search}%` } },
          { lastName: { [Op.like]: `%${search}%` } },
          { accountStatus: { [Op.like]: `%${search}%` } },
        ],
      };

      // Get admins with pagination and apply filter
      const { rows, count } = await getAdminiwithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return all admins without pagination
        const allAdmins = await getAllAdmins({where: whereClause});
        responseData = { error: false, msg: 'Show All Admins', data:{rows: allAdmins} };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: 'Show All Admins with Pagination',
          data: {
            count,
            rows,
            perPage,
            currentPage,
            totalPages: Math.ceil(count / perPage),
          },
        };
      }

      return res.status(200).json(responseData);
    } catch (error) {
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Get One Admin
  getAdminById: async (req, res) => {
    try {
      const { adminId } = req.params;

      // Retrieve admin by ID
      const admin = await getSingleAdmin({ adminId });

      // Return admin data
      return res.status(200).json({ error: false, msg: 'Admin found', data: admin });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

  //create Admin
  adminCreate: async (req, res) => {
    try {
      const {
        email, password, firstName, lastName, mobile, role,
      } = req.body;

      // Check if admin with email already exists
      await getAdmin({ email });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await createAdmin({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        mobile,
        role,
      });
      res.status(200).json({ error: false, msg: 'Admin created successfully' });
    } catch (error) {
      logger.error(error);
      res
        .status(400)
        .json({ error: true, msg: error.message });
    }
  },

  //Update Admin
  updateAdmin: async (req, res) => {
    const { adminId } = req.params;
    const updateData = req.body;
    try {
      // Check if a new password is provided
      if (updateData.password) {
        // Hash the new password using bcrypt
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt)

        // Update passwordUpdatedAt field
        updateData.passwordUpdatedAt = new Date(); // Set the current time
      }

      if (updateData.email) {
        // Update emailUpdatedAt field
        updateData.emailUpdatedAt = new Date(); // Set the current time
      }
      // Perform the update
      await updateAdmin({ adminId: adminId }, updateData);
      res.status(200).send({ error: false, msg: "Admin updated successfully" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Delete Admin
  deleteAdmin: async (req, res) => {
    try {
      const { adminId } = req.params;
      // Retrieve the admin to check if it's a super admin
      const admin = await getSingleAdmin({ adminId });

      // Check if the admin to be deleted is a super admin
      if (admin.isSuperAdmin === 'yes') {
        return res.status(403).json({ error: true, msg: 'Super admin cannot be deleted' });
      }

      // Perform bulk delete operation
      await deleteAdmin({ adminId });

      // Return success response
      return res.status(200).json({ error: false, msg: 'Admins deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Update Admin Status
  updateAdminStatus: async (req, res) => {
    try {
      const { adminId } = req.params;
      const { accountStatus,bannedReason } = req.body;
      // If status is set to 'Banned', require banned reason
      if (accountStatus === 'Banned' && !bannedReason) {
        return res.status(400).json({error: true, msg: 'Banned reason is required'});
      }
      await updateAdmin({ adminId }, { accountStatus,bannedReason });
      return res.status(200).json({ error: false, msg: 'Admin Account status updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Bulk-Delete Admin
  bulkDeleteAdmins: async (req, res) => {
    try {
      const { adminIds } = req.body;

      // Perform bulk delete operation
      await deleteAdmin({ adminId: { [Op.in]: adminIds } });

      // Return success response
      return res.status(200).json({ error: false, msg: 'Admins deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

};

module.exports = adminApi;
