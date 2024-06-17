const express = require('express');
const currencyController = require('../controllers/currency');
const { validate } = require('../middleware/validation');
const rules = require('../middleware/validation-rules');


const router = express.Router();
router.get('/', currencyController.getAllCurrencies);
router.get('/view-all',currencyController.getAllCurrenciesWithPagination);
router.get('/:currencyId', currencyController.getCurrencyById);
router.post('/create', [validate(rules.createCurrency)], currencyController.createCurrency);
router.put('/update/:currencyId', [validate(rules.updateCurrency)], currencyController.updateCurrency);
router.delete('/delete/:currencyId', [validate(rules.deleteCurrency)], currencyController.deleteCurrency);
router.post('/bulk-delete', [validate(rules.bulkDeleteCurrency)], currencyController.bulkDeleteCurrency);

module.exports = router;
