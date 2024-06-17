const express = require('express');
const brandController = require('../controllers/brand');
const { validate } = require('../middleware/validation');
const rules = require('../middleware/validation-rules');


const router = express.Router();
router.get('/', brandController.getAllBrandItems);
router.get('/view-all', brandController.getAllBrandItemsWithPagination);
router.get('/:brandId', brandController.getBrandItemById);
router.post('/create', [validate(rules.createBrand)], brandController.createBrandItem);
router.put('/update/:brandId', [validate(rules.updateBrand)], brandController.updateBrandItem);
router.put("/update/status/:brandId",[validate(rules.updateBrandStatus)],brandController.updateBrandItemStatus);
router.delete('/delete/:brandId', [validate(rules.deleteBrand)], brandController.deleteBrandItem);
router.post('/bulk-delete', [validate(rules.bulkDeleteBrands)], brandController.bulkDeleteBrandItems);

module.exports = router;
