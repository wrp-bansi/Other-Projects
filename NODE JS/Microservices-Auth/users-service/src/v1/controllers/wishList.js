const { Op } = require('sequelize');
const logger = require('../helpers/logger-helper');
const {getAllwishLists, getSinglewishList, createwishList, updatewishList, deletewishList, getwishListwithpagination} = require('../services/wishList');
const { getOneProduct } = require('../../../../product-service/src/v1/services/products');

const wishlistApi = {

  // Get Wishlist Items with Pagination
  getAllWishlistItemsWithPagination: async (req, res) => {
    try {
      const {
        orderBy = 'wishlistId',
        order = 'DESC',
        search = '',
        isDownload = false,
        filter = {},
      } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      const whereClause = {
        ...filter,
        [Op.or]: {
          userId: { [Op.like]: `%${search}%` },
          productId: { [Op.like]: `%${search}%` },
        },
      };

      // Get roles with pagination and apply filter
      const data = await getwishListwithpagination(whereClause, {
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return all wishlist items without pagination
        const allItems = await getAllwishLists(whereClause);
        responseData = { error: false, msg: 'Show All Wishlist Items', data: { rows: allItems } };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: 'Show All Wishlist Items with Pagination',
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

  // Get wish list items without Pagination
  getAllWishlistItems: async (req, res) => {
    try {
      const wishlistItems = await getAllwishLists();
      const wishlistItemsWithDetails = await Promise.all(wishlistItems.map(async (item) => {
        const product = await getOneProduct({ productId: item.productId });
        return {
          wishlistId: item.wishlistId,
          userId: item.userId,
          productId: item.productId,
          productName: product.productName,
          productImage: product.productImage,
          stock: product.stock,
          regularPrice: product.regularPrice,
          salePrice: product.salePrice,
          addedDate: item.addedDate,
          notes: item.notes,
        };
      }));
      res.status(200).json({ error: false, msg: 'Show all Wishlist Items', data:{rows:wishlistItemsWithDetails} });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Get Wishlist Item by ID
  getWishlistItemById: async (req, res) => {
    const { wishlistId } = req.params;
    try {
      const wishlistItem = await getSinglewishList({wishlistId});
      if (!wishlistItem) {
        throw new Error('Wish List not found');
      }
      res.status(200).send({ error: false, msg: 'Show Wishlist Items by id', wishlistItem });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg:error.message });
    }
  },

  // Create Wishlist Item
  createWishlistItem: async (req, res) => {
    const { userId, productId, addedDate, notes } = req.body;
    const wishlistData ={userId, productId, addedDate, notes}
    try {
      // Check if the wishlist item already exists
      const existingWishlistItem = await getSinglewishList({ userId, productId });

      if (existingWishlistItem) {
        // If it exists, update the existing item instead of creating a new one
        await updatewishList({ wishlistId: existingWishlistItem.wishlistId }, wishlistData);
        return res.status(200).json({ error: false, msg: 'Wishlist item updated successfully' });
      }
      await createwishList(wishlistData);
      res.status(200).json({ error: false, msg: 'Wishlist item created successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg:error.message });
    }
  },

  // Update Wishlist Item
  updateWishlistItem: async (req, res) => {
    const { wishlistId } = req.params;
    const updateData = req.body;
    try {
      await updatewishList({ wishlistId }, updateData);
      res.status(200).send({ error: false, msg: 'Wishlist item updated successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Delete Wishlist Item
  deleteWishlistItem: async (req, res) => {
    const { productId } = req.params;
    try {
      await deletewishList({ productId } );
      res.status(200).send({ error: false, msg: 'Wishlist item deleted successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg:error.message });
    }
  },

  // Bulk delete Wishlist Item
  bulkDeleteWishlistItems: async (req, res) => {
    const { wishlistIds } = req.body;
    try {
      // Perform bulk delete operation
      await deletewishList({ wishlistId: { [Op.in]: wishlistIds } });

      // Return success response
      return res.status(200).json({ error: false, msg: 'Wishlist Item deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  },
};

module.exports = wishlistApi;
