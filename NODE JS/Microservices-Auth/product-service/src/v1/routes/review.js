const express = require('express');
const reviewController = require('../controllers/review');
const { validate } = require('../middleware/validation');
const rules = require('../middleware/validation-rules');


const router = express.Router();
router.get('/', reviewController.getAllReviews);
router.get('/admin/review/view-all', reviewController.getAllReviewWithPagination);
router.get('/admin/review/check-order',reviewController.checkOrder)
router.get('/admin/review/:productId', reviewController.getReviewById);
router.post('/customer/review/create', [validate(rules.createReview)], reviewController.createReview);
router.put('/customer/review/update/:reviewId', [validate(rules.updateReview)], reviewController.updateReview);
router.delete('/admin/review/delete/:reviewId', [validate(rules.deleteReview)], reviewController.deleteReview);
router.post('/admin/review/bulk-delete', [validate(rules.bulkDeleteReviews)], reviewController.bulkDeleteReviews);

module.exports = router;
