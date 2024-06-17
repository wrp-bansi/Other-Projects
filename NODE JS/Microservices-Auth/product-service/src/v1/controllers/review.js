const { Op } = require('sequelize');
const logger = require('../helpers/logger-helper');
const {getSingleReview,getAllReviews,createReview,updateReview,deleteReview,getReviewsWithPagination} = require('../services/review');
const { updateProduct } = require('../services/products');
const { checkIfUserOrderedProduct } = require('../../../../order-service/src/v1/services/orderItem');
const { getOneUser } = require('../../../../users-service/src/v1/services/users');
const Users = require('../../../../users-service/src/v1/models/users');


const reviewApi = {

  // Get Reviews with Pagination
  getAllReviewWithPagination: async (req, res) => {
    try {
      const {orderBy = 'reviewId',order = 'DESC',search = '',isDownload = false,filter = {}} = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      const whereClause = {
        ...filter,
        [Op.or]: {
          comment: { [Op.like]: `%${search}%` }
        }
      };


      // Get reviews with pagination and apply filter
      const data = await getReviewsWithPagination(whereClause, {
        offset,
        limit: perPage,
        order: [[orderBy, order]]
      });
      // Extract user IDs from the reviews
      const userIds = data.rows.map(review => review.userId);

      // Fetch user details for the extracted user IDs
      const users = await Users.findAll({
        where: {
          userId: {
            [Op.in]: userIds
          }
        },
        attributes: ['userId', 'firstName','lastName','mobile', 'email']
      });

      // Create a map of userId to user details
      const userMap = users.reduce((acc, user) => {
        acc[user.userId] = user;
        return acc;
      }, {});

      // Map user details to respective reviews
      const reviewsWithUserDetails = data.rows.map(review => ({
        ...review.toJSON(),
        user: userMap[review.userId]
      }));


      let responseData;

      if (isDownload === 'true') {
        // If downloading, return all reviews without pagination
        const allReviews = await getAllReviews({where: whereClause});
        // Extract user IDs from the reviews
        const allUserIds = allReviews.map(review => review.userId);

        // Fetch user details for the extracted user IDs
        const allUsers = await Users.findAll({
          where: {
            userId: {
              [Op.in]: allUserIds
            }
          },
          attributes: ['userId', 'firstName','lastName','mobile', 'email']
        });

        // Create a map of userId to user details
        const allUserMap = allUsers.reduce((acc, user) => {
          acc[user.userId] = user;
          return acc;
        }, {});

        // Map user details to respective reviews
        const allReviewsWithUserDetails = allReviews.map(review => ({
          ...review.toJSON(),
          user: allUserMap[review.userId]
        }));
        responseData = { error: false, msg: 'Show All Reviews', data: { rows: allReviewsWithUserDetails } };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: 'Show All Reviews with Pagination',
          data: {
            count: data.count,
            rows: reviewsWithUserDetails,
            perPage,
            currentPage,
            totalPages: Math.ceil(data.count / perPage)
          }
        };
      }

      return res.status(200).json(responseData);
    } catch (error) {
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Get All Reviews without Pagination
  getAllReviews: async (req, res) => {
    try {
      const data = await getAllReviews();

      if (!data || data.length === 0) {
        throw new Error('Reviews not found');
      }

      res.status(200).json({ error: false, msg: 'Show all Reviews', data: { rows: data } });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Get One Review by ID
  getReviewById: async (req, res) => {
    const { productId } = req.params;
    try {
      const reviews = await getAllReviews({ where: { productId: productId } });

      const reviewsWithData = await Promise.all(reviews.map(async (review) => {
        const user = await getOneUser({ userId: review.userId }, {
          attributes: ['firstName', 'lastName']
        });
        return {
          ...review.toJSON(),
          user: {
            firstName: user.firstName,
            lastName: user.lastName
          }
        };
      }));

      res.status(200).send({ error: false, msg: 'Show Review by ID', data: reviewsWithData });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Create Review
  createReview: async (req, res) => {
    const { productId, userId, rating, comment } = req.body;
    const reviewData = { productId, userId, rating, comment };
    try {
    // Check if the user has ordered the product
      const hasOrderedProduct = await checkIfUserOrderedProduct(userId, productId);

      if (!hasOrderedProduct) {
        return res.status(403).json({ error: true, msg: 'You can only review products you have ordered.' });

      }
      await createReview(reviewData);

      // Calculate average rating for the product
      const reviews = await getAllReviews({ productId });
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;

      // Update the product with the calculated average rating
      await updateProduct({ productId }, { averageRating });

      res.status(200).send({ error: false, msg: 'Review Created successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Update Review
  updateReview: async (req, res) => {
    const { reviewId } = req.params;
    const updateData = req.body;
    try {
      await updateReview({reviewId}, updateData);
      // Recalculate average rating for the product associated with the review
      const review = await getSingleReview({reviewId});
      const productId = review.productId;
      const reviews = await getAllReviews({ productId });
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;

      // Update the product with the new average rating
      await updateProduct({ productId }, { averageRating });
      res.status(200).send({ error: false, msg: 'Review updated successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Delete Review
  deleteReview: async (req, res) => {
    const { reviewId } = req.params;
    try {
      const review = await getSingleReview({reviewId});
      const productId = review.productId;

      // Delete the review
      await deleteReview({reviewId});

      // Recalculate average rating for the product after removing the review
      const reviews = await getAllReviews({ productId });
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;

      // Update the product with the new average rating
      await updateProduct({ productId }, { averageRating });
      res.status(200).send({ error: false, msg: 'Review deleted successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Bulk Delete Reviews
  bulkDeleteReviews: async (req, res) => {
    const { reviewIds } = req.body;
    try {
    // Perform bulk delete operation
      await Promise.all(reviewIds.map(async (reviewId) => {
        // Fetch the review to get the product ID before deleting it
        const review = await getSingleReview(reviewId);
        const productId = review.productId;

        // Delete the review
        await deleteReview({reviewId});

        // Recalculate average rating for the product after removing the review
        const reviews = await getAllReviews({ productId });
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        // Update the product with the new average rating
        await updateProduct({ productId }, { averageRating });
      }));

      // Return success response
      return res.status(200).json({ error: false, msg: 'Reviews deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

  // check perticulare product order created by user
  checkOrder: async (req, res) => {
    const { userId, productId } = req.query;
    try {
      // Check if the specified user has placed an order for the given product
      const hasOrderedProduct = await checkIfUserOrderedProduct(userId, productId);

      // Return the result
      res.status(200).json({ ordered: hasOrderedProduct });
    } catch (error) {
      // Handle errors appropriately
      res.status(400).json({ error: true, msg: error.message });
    }
  }

};

module.exports = reviewApi;
