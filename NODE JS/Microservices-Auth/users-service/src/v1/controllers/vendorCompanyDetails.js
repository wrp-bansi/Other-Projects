const { getVendorCompanyDetailswithpagination, getAllVendorCompanyDetails, updateVendorCompanyDetails } = require("../services/VendorCompanyDetails");
const { Op } = require('sequelize');

const vendorCompanyDetailsApi = {

  // Get All Vendor with company details without Pagination
  getAllVendor: async (req, res) => {
    try {
      const {
        orderBy = 'companyId', order = 'DESC', search = '', isDownload = false, filter = {},
      } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      const whereClause = {
        ...filter,
        [Op.or]: {
          companyName: { [Op.like]: `%${search}%` }
        },
      };

      // Get roles with pagination and apply filter
      const data = await getVendorCompanyDetailswithpagination(whereClause, {
        offset,
        limit: perPage,
        order: [[orderBy, order]]
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return all User roles without pagination
        const allVendors = await getAllVendorCompanyDetails(whereClause);
        responseData = { error: false, msg: 'Show All Vendors', data:{rows: allVendors} };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: 'Show All Vendors with Pagination',
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

  // Update Vendor Commission
  updateVendorCommission: async (req, res) => {
    const { userId } = req.params;
    const { vendorCommission } = req.body;
    try {
      await updateVendorCompanyDetails({userId: userId}, {vendorCommission});
      return res.status(200).json({error: false, msg: 'Vendor commission updated successfully'});
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

};

module.exports = vendorCompanyDetailsApi;
