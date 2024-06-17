const Product = require('../models/product');
const Review = require('../models/review');

// Get reviews with pagination
async function getReviewsWithPagination(whereParams, otherData) {
  const data = await Review.findAndCountAll({
    where: whereParams,
    ...otherData,
  });

  // If no reviews found, throw an error
  if (!data || data.rows.length === 0) {
    return { count: 0, rows: [] };
  }

  return data;
}

// Get all reviews without pagination
async function getAllReviews(whereParams) {
  const data = await Review.findAll(whereParams);

  return data;
}

// Get one review by ID
async function getSingleReview(whereParams) {
  const data = await Review.findOne({where:whereParams});
  if (!data) {
    throw new Error('Review not found');
  }
  return data;
}

// Create a new review
async function createReview(reviewData) {
  const newReview = await Review.create(reviewData);
  if (newReview) {
    return newReview;
  }
  throw new Error('Failed to create review');
}

// Update a review
async function updateReview(updateParams, updateData) {
  // Check if the review exists
  const existingReview = await getSingleReview(updateParams);
  if (!existingReview) {
    throw new Error('Review not found');
  }

  await existingReview.update(updateData);
  return existingReview;
}

// Delete a review
async function deleteReview(deleteParams) {
  const data = await Review.destroy({ where: deleteParams });
  if (data === 0) {
    throw new Error('Review not found');
  }
  return { msg: 'Review deleted successfully' };
}

//count reviews
const countReviews = async (vendorId) => {
  try {
    const reviewsCount = await Review.count({
      include: [{
        model: Product,
        as: 'product', // Specify the alias for the association
        where: { ownerId: vendorId }
      }]
    });
    return reviewsCount;
  } catch (error) {
    throw new Error(`Error counting reviews: ${error.message}`);
  }
};


module.exports = {
  getSingleReview,
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
  getReviewsWithPagination,
  countReviews
};
