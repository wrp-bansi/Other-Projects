const express = require('express');
const wishListController = require('../controllers/wishList');
const { validate } = require('../middleware/validation');
const rules = require('../middleware/validation-rules');


const router = express.Router();
router.get('/', wishListController.getAllWishlistItems);
router.get('/view-all',wishListController.getAllWishlistItemsWithPagination);
router.get('/:wishlistId', wishListController.getWishlistItemById);
router.post('/create', [validate(rules.createWishlistItem)], wishListController.createWishlistItem);
router.put('/update/:wishlistId', [validate(rules.updateWishlistItem)], wishListController.updateWishlistItem);
router.delete('/delete/:productId', [validate(rules.deleteWishlistItem)], wishListController.deleteWishlistItem);
router.post('/bulk-delete', [validate(rules.bulkDeleteWishlistItems)], wishListController.bulkDeleteWishlistItems);

module.exports = router;
