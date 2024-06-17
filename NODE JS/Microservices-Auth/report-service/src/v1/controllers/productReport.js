const { Op } = require("sequelize");
const { getAllProducts, getProductwithpagination } = require('../../../../product-service/src/v1/services/products');

const productReportApi = {

  // Retrieves products created within a specified date range
  getProductsByCreationDate: async (req, res) => {
    try {
      const { orderBy = "createdAt", order = "DESC", filter = {}, isDownload = false } = req.query;
      const { startDate, endDate } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      // Parse start date and end date into Date objects
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      // Adjust end date to include the whole day
      endDateObj.setHours(23, 59, 59, 999);

      const whereClause = {
        createdAt: {
          [Op.between]: [startDateObj, endDateObj]
        },
        ...filter
      };

      // Get Products with pagination and apply filter
      const data = await getProductwithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allProducts = await getAllProducts({ where: whereClause});
        responseData = { error: false, msg: `Products fetched successfully`, data: { rows: allProducts } };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: `Products fetched successfully`,
          data: {
            count: data.count,
            rows: data.rows,
            perPage,
            currentPage,
            totalPages: Math.ceil(data.count / perPage)
          }
        };
      }
      // Return products response
      if (responseData.length === 0) {
        return res.status(200).json({ error: false, msg: "No products found between the specified dates", data: { rows: responseData } });
      }
      return res.status(200).json(responseData);
    } catch (error) {
      console.error("Error occurred while fetching products:", error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Retrieves products based on their status (active or inactive)
  getProductsByStatus: async (req, res) => {
    try {
      const { orderBy = "createdAt", order = "DESC", filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);
      const { status } = req.query;


      // Parse search query into where clause
      const whereClause = {
        ...filter,
        productStatus: status
      };

      // Get Products with pagination and apply filter
      const data = await getProductwithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allProducts = await getAllProducts({ where: whereClause});
        responseData = { error: false, msg: `Products with status "${status}" fetched successfully`, data: { rows: allProducts } };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: `Products with status "${status}" fetched successfully`,
          data: {
            count: data.count,
            rows: data.rows,
            perPage,
            currentPage,
            totalPages: Math.ceil(data.count / perPage)
          }
        };
      }
      // Return products response
      if (responseData.length === 0) {
        return res.status(200).json({ error: false, msg: `No ${status} products found`, data: responseData });
      }
      return res.status(200).json(responseData);
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Retrieves products within a specified stock range
  getProductsByStockRange: async (req, res) => {
    try {
      const { orderBy = "productId", order = "DESC", filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);
      const { minStock, maxStock } = req.query;

      // Parse search query into where clause
      const whereClause = {
        ...filter,
        stock: {
          [Op.between]: [minStock, maxStock]
        }
      };

      // Get Products with pagination and apply filter
      const data = await getProductwithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allProducts = await getAllProducts({ where: whereClause});
        responseData = { error: false, msg: `Products within the specified Stock range fetched successfully`, data: { rows: allProducts } };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: `Products within the specified Stock range fetched successfully`,
          data: {
            count: data.count,
            rows: data.rows,
            perPage,
            currentPage,
            totalPages: Math.ceil(data.count / perPage)
          }
        };
      }
      // Return products response
      if (responseData.length === 0) {
        return res.status(200).json({ error: false, msg: `No products found within the specified Stock range`, data: responseData });
      }
      return res.status(200).json(responseData);
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Retrieves products with a Stock less than 10
  getProductsLessThan10Stock: async (req, res) => {
    try {
      const maxQuantity = process.env.MAX_QUANTITY || 10;

      // Fetch products with Stock less than 10
      const products = await getAllProducts({
        where: {
          stock: {
            [Op.lt]: maxQuantity // Using less than operator
          }
        }
      });

      // Return products response
      if (products.length === 0) {
        return res.status(200).json({ error: false, msg: `No products found with less than 10 Stock in stock`, data: { rows: products } });
      }

      res.status(200).json({ error: false, msg: `Products with less than 10 Stock in stock fetched successfully`, data: { rows: products } });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Retrieves out-of-stock products
  getOutOfStockProducts: async (req, res) => {
    try {
      // Fetch products with inactive status and stock 0
      const products = await getAllProducts({
        where: {
          stock: 0,
          productStatus: 'InActive'
        }
      });
      // Return products response
      if (products.length === 0) {
        return res.status(200).json({ error: false, msg: `No out-of-stock products found`, data: { rows: products } });
      }

      res.status(200).json({ error: false, msg: `Out-of-stock products fetched successfully`, data: { rows: products } });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Retrieves products list by filter
  getProductsByFilter: async (req, res) => {
    try {
      const { order, filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);
      const {minRegularPrice, maxRegularPrice, minSalePrice, maxSalePrice, categoryId,brandId,isEnquiry } = req.query;

      // Determine orderBy based on provided filters
      let orderBy = "productId"; // Default orderBy
      if ((minRegularPrice !== undefined && maxRegularPrice !== undefined) || (minSalePrice !== undefined && maxSalePrice !== undefined)) {
        orderBy = "productName"; // You can change the orderBy logic based on your requirement
      } else if (categoryId !== undefined) {
        orderBy = "productName"; // You can change the orderBy logic based on your requirement
      }

      // Construct where clause for filtering
      const whereClause = {
        productStatus: 'Active' // Filter for active products
      };


      // Add regular price filter if provided
      if (minRegularPrice !== undefined && maxRegularPrice !== undefined) {
        whereClause.regularPrice = {
          [Op.between]: [minRegularPrice, maxRegularPrice]
        };
      }

      // Add sale price filter if provided
      if (minSalePrice !== undefined && maxSalePrice !== undefined) {
        whereClause.salePrice = {
          [Op.between]: [minSalePrice, maxSalePrice]
        };
      }

      // Add category filter if provided
      if (categoryId) {
        whereClause.categoryId = categoryId;
      }
      // Add brand filter if provided
      if (brandId) {
        whereClause.brandId = brandId;
      }
      // Add isEnquiry filter if provided
      if (isEnquiry !== undefined) {
        whereClause.isEnquiry = isEnquiry === 'true'; // Ensure boolean conversion
      }

      // Add additional filters if provided
      Object.assign(whereClause, filter);

      // Adjust order parameters
      const orderParams = [[orderBy, order || 'ASC']];

      // Get Products with pagination and apply filter
      const data = await getProductwithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: orderParams,
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allProducts = await getAllProducts({ where: whereClause, order: orderParams });
        responseData = { error: false, msg: `Products fetched successfully`, data: { rows: allProducts } };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: `Products fetched successfully`,
          data: {
            count: data.count,
            rows: data.rows,
            perPage,
            currentPage,
            totalPages: Math.ceil(data.count / perPage)
          }
        };
      }

      // Return products response
      if (data.rows.length === 0) {
        return res.status(200).json({ error: false, msg: "No products found with the specified filters", data: responseData });
      }
      return res.status(200).json(responseData);
    } catch (error) {
      console.error("Error occurred while fetching products:", error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

}

module.exports = productReportApi;
