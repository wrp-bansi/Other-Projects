const { Op } = require('sequelize');
const logger = require('../helpers/logger-helper');
const { getAllBrands, getSingleBrand, createBrand, updateBrand, deleteBrand, getBrandWithPagination, getBrandWithProductsById } = require('../services/brand');

const brandApi = {

  // Get All Brand Items with Pagination
  getAllBrandItemsWithPagination: async (req, res) => {
    try {
      const { orderBy = "brandId", order = "DESC", search = "", filter = {}, isDownload = false, isBrand = "" } = req.query;
      const { offset, perPage } = global.common.getPaginationParams(req.query);

      let brandWithProducts;
      const brandIdArray = isBrand ? isBrand.split(',').map(Number) : [];

      if (isDownload === 'true') {
        // Fetch all brands with their products
        const brands = await getAllBrands();
        brandWithProducts = [];

        for (const brand of brands) {
          const brandWithProductsData = await getBrandWithProductsById(brand.brandId);
          brandWithProducts.push(brandWithProductsData);
        }
        // Filter brands if isBrand is provided
        if (brandIdArray.length > 0) {
          brandWithProducts = brandWithProducts.filter(brand => brandIdArray.includes(brand.brand.brandId));
        }
        // Send the response
        res.status(200).json({
          error: false,
          msg: "Brand with Products Fetched successfully",
          data: brandWithProducts
        });
      } else {
        const whereClause = {
          ...filter,
          [Op.or]: {
            brandName: { [Op.like]: `%${search}%` },
            description: { [Op.like]: `%${search}%` },
          },
        };
        if (brandIdArray.length > 0) {
          whereClause.brandId = {
            [Op.in]: brandIdArray
          };
        }

        // Fetch paginated brands with their products
        const { rows: brands, count } = await getBrandWithPagination({
          where: whereClause,
          offset,
          limit: perPage,
          order: [[orderBy, order]],
        });

        brandWithProducts = [];

        for (const brand of brands) {
          const brandWithProductsData = await getBrandWithProductsById(brand.brandId);
          brandWithProducts.push(brandWithProductsData);
        }

        if (brandIdArray.length > 0) {
          brandWithProducts = brandWithProducts.filter(brand => brandIdArray.includes(brand.brand.brandId));
        }

        // Calculate total pages
        const totalPages = Math.ceil(count / perPage);

        // Send the response with pagination details
        res.status(200).json({
          error: false,
          msg: "Brand with Products Fetched successfully",
          data: {
            count,
            rows: brandWithProducts,
            perPage,
            currentPage: Math.floor(offset / perPage) + 1,
            totalPages
          }
        });
      }
    } catch (error) {
      // Handle errors
      console.error('Error fetching Brands with products:', error);
      res.status(400).json({ error: error.message });
    }
  },

  // Get Brand items without Pagination
  getAllBrandItems: async (req, res) => {
    try {
      const data = await getAllBrands();
      res.status(200).json({ error: false, msg: 'Show all Brands', data: { rows: data } });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Get Brand Item by ID
  getBrandItemById: async (req, res) => {
    const { brandId } = req.params;
    try {
      const brandItem = await getSingleBrand({ brandId });
      res.status(200).send({ error: false, msg: 'Show Brand Items by id', brandItem });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Create Brand Item
  createBrandItem: async (req, res) => {
    const { brandName, description, logoUrl, status } = req.body;
    const brandData = { brandName, description, logoUrl, status };
    try {
      await createBrand(brandData);
      res.status(200).json({ error: false, msg: 'Brand item created successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Update Brand Item
  updateBrandItem: async (req, res) => {
    const { brandId } = req.params;
    const updateData = req.body;
    try {
      await updateBrand({ brandId }, updateData);
      res.status(200).send({ error: false, msg: 'Brand item updated successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Update Brand Item Status
  updateBrandItemStatus:async (req, res) => {
    const { brandId } = req.params;
    const {status} = req.body;
    try {
      await updateBrand({ brandId },{status: status});
      res.status(200).send({ error: false, msg: 'Brand item Status updated successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Delete Brand Item
  deleteBrandItem: async (req, res) => {
    const { brandId } = req.params;
    try {
      await deleteBrand({ brandId });
      res.status(200).send({ error: false, msg: 'Brand item deleted successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Bulk delete Brand Items
  bulkDeleteBrandItems: async (req, res) => {
    const { brandIds } = req.body;
    try {
      // Perform bulk delete operation
      await deleteBrand({ brandId: { [Op.in]: brandIds } });

      // Return success response
      return res.status(200).json({ error: false, msg: 'Brand items deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  },
};

module.exports = brandApi;
