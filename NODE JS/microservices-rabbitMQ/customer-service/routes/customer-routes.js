

const express = require('express');
const router = express.Router();
const {createCustomer,getCustomer}=require('../controllers/customer-controller')

router.post('/customers', createCustomer);
router.get('/customers',getCustomer)

module.exports = router;
