
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticate-token')
const { addBarber, addOwner } = require('../controllers/add-ownerbarber')




//add barber and owner
router.post('/addbarber',authenticateToken, addBarber)
router.post('/addowner',authenticateToken, addOwner)


module.exports = router;
