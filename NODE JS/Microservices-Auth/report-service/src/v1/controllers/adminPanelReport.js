/* eslint-disable max-lines-per-function */
const { getSettingValue } = require("../../../../order-service/src/v1/helpers/chche-helper");
const { getAllVendorCompanyDetails } = require("../../../../users-service/src/v1/services/VendorCompanyDetails");
const { getAllOrderItems } = require("../../../../order-service/src/v1/services/orderItem");
const { getAllWalletHistory } = require("../../../../revenew-service/src/v1/services/walletHistory");
const { getAllProducts } = require("../../../../product-service/src/v1/services/products");
const { Op } = require("sequelize");
const Product = require("../../../../product-service/src/v1/models/product");


const commissionReportApi = {

  // Get Commission Report By filters
  getCommissionReport: async (req, res) => {
    try {
      const { startDate, endDate,isDownload = false, vendorId} = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      const whereClause = {};
      // Parsing query parameters
      if (startDate && endDate) {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        endDateObj.setHours(23, 59, 59, 999);
        whereClause.createdAt = { [Op.between]: [startDateObj, endDateObj] };
      }

      // If vendorId is provided, filter by vendorId
      if (vendorId) {
        whereClause.userId = vendorId;
      }

      // Retrieve all vendors
      const vendors = await getAllVendorCompanyDetails(whereClause);

      // Create an array to store commission report for each vendor
      const commissionReport = [];

      // Iterate through each vendor
      for (const vendor of vendors) {
        const vendorId = vendor.userId;

        try {
        // Get commission rate for the vendor
          let commissionRate = vendor.vendorCommission;


          // If the commission rate is 0, fetch the default commission rate from the settings table
          if (commissionRate === 0) {
            // Fetch default commission rate from settings table
            commissionRate = await getSettingValue('commission_percentage');
          }
          // Get all products belonging to the vendor
          const products = await getAllProducts({ where: { ownerId: vendorId } });

          let totalSales = 0;

          // Iterate through each product
          for (const product of products) {
          // Get order items for the product
            const orderItems = await getAllOrderItems({ where: { productId: product.productId } });

            // Calculate total sales for the product
            const productTotalSales = orderItems.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);

            // Add product's total sales to overall total sales
            totalSales += productTotalSales;
          }

          // Get wallet history for the vendor
          const walletHistory = await getAllWalletHistory({ vendorId, type: "Debit", status: "Completed"});

          // Calculate total amount paid to the vendor
          const totalAmountPaid = walletHistory.reduce((total, entry) => total + entry.amount, 0);

          // Get commission rate for the vendor
          const commission = totalSales * (commissionRate / 100);

          // Calculate total amount pending for the vendor
          const totalAmountPending = totalSales - commission - totalAmountPaid;

          // Push vendor's commission report to the array
          commissionReport.push({
            vendorId:vendor.userId,
            companyName: vendor.companyName,
            vendorName: `${vendor.userDetails.firstName} ${vendor.userDetails.lastName}`,
            totalSales:parseFloat(totalSales.toFixed(2)),
            commissionRate,
            commission:parseFloat(commission.toFixed(2)),
            totalAmountPaid:parseFloat(totalAmountPaid.toFixed(2)),
            totalAmountPending:parseFloat(totalAmountPending.toFixed(2))
          });
        } catch (error) {
          continue;
        }
      }
      // If isDownload is true, return all data without pagination
      if (isDownload === 'true') {
        return res.status(200).json({ error: false, msg: "Commission Report Generated", data: { rows: commissionReport } });
      }

      // Apply pagination
      const paginatedData = commissionReport.slice(offset, offset + perPage);
      const totalCount = commissionReport.length;
      const totalPages = Math.ceil(totalCount / perPage);

      // Send paginated commission report as JSON response
      return res.status(200).json({
        error: false,
        msg: "Commission Report Generated",
        data: {
          count: totalCount,
          rows: paginatedData,
          perPage,
          currentPage,
          totalPages
        }
      });
    } catch (error) {
      console.error('Error fetching commission report:', error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Get Top Performing Vendors
  getTopPerformingVendors: async (req, res) => {
    try {
      const { startDate, endDate, limit } = req.query;

      const whereClause = {};
      // Parsing query parameters
      if (startDate && endDate) {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        endDateObj.setHours(23, 59, 59, 999);
        whereClause.createdAt = { [Op.between]: [startDateObj, endDateObj] };
      }

      // Retrieve all vendors
      const vendors = await getAllVendorCompanyDetails(whereClause);

      // Create an array to store commission report for each vendor
      const vendorSales = [];

      // Iterate through each vendor
      for (const vendor of vendors) {
        const vendorId = vendor.userId;
        // Get commission rate for the vendor
        let commissionRate = vendor.vendorCommission;


        // If the commission rate is 0, fetch the default commission rate from the settings table
        if (commissionRate === 0) {
          // Fetch default commission rate from settings table
          commissionRate = await getSettingValue('commission_percentage');
        }
        // Get all products belonging to the vendor
        const products = await getAllProducts({ where: { ownerId: vendorId } });

        let totalSales = 0;

        // Iterate through each product
        for (const product of products) {
          // Get order items for the product
          const orderItems = await getAllOrderItems({ where: { productId: product.productId } });

          // Calculate total sales for the product
          const productTotalSales = orderItems.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);

          // Add product's total sales to overall total sales
          totalSales += productTotalSales;
        }

        // Get wallet history for the vendor
        await getAllWalletHistory({ vendorId, type: "Debit", status: "Completed" });


        // Get commission rate for the vendor
        const commission = totalSales * (commissionRate / 100);
        totalSales = totalSales - commission


        // Push vendor's commission report to the array
        vendorSales.push({
          vendorId: vendor.userId,
          companyName: vendor.companyName,
          totalSales: totalSales.toFixed(2),
        });
      } // Sort vendors based on their total sales in descending order
      vendorSales.sort((a, b) => b.totalSales - a.totalSales);

      // Optionally, limit the number of top-performing vendors to display
      const topPerformingVendors = limit ? vendorSales.slice(0, limit) : vendorSales;

      // Send the top-performing vendors as JSON response
      return res.status(200).json({
        error: false,
        msg: "Top Performing Vendors Retrieved",
        data: topPerformingVendors
      });
    } catch (error) {
      console.error('Error fetching commission report:', error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Most sold products
  getMostSoldProducts: async (req, res) => {
    try {
      const { orderBy = "totalQuantitySold", order = "DESC", filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);
      const {startDate, endDate,vendorId } = req.query
      let whereClause = { ...filter };

      // Conditionally add date filter if startDate and endDate are provided
      if (startDate && endDate) {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        endDateObj.setHours(23, 59, 59, 999);
        whereClause = {
          ...whereClause,
          createdAt: { [Op.between]: [startDateObj, endDateObj] }
        };
      }
      if (vendorId) {
        whereClause.ownerId = vendorId;
      }


      let mostSoldProducts;
      if (isDownload === 'true') {
        // Fetch products without pagination
        mostSoldProducts = await Product.findAll({
          where: whereClause,
          order: [[orderBy, order]]
        });
      } else {
        // Fetch products with pagination
        mostSoldProducts = await Product.findAndCountAll({
          where: whereClause,
          order: [[orderBy, order]],
          limit: perPage,
          offset: offset
        });

      }

      const responseData = {
        error: false,
        msg: "Most sold products fetched successfully",
        data: isDownload === 'true' ?{rows: mostSoldProducts} : {rows:mostSoldProducts.rows},
        currentPage: isDownload === 'true' ? undefined : currentPage,
        perPage: isDownload === 'true' ? undefined : perPage,
        totalPages: isDownload === 'true' ? undefined : Math.ceil(mostSoldProducts.count / perPage),
        count: isDownload === 'true' ? mostSoldProducts.length : mostSoldProducts.count
      };

      return res.status(200).json(responseData);

    } catch (error) {
      console.error('Error fetching most sold products:', error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

}

module.exports = commissionReportApi;
