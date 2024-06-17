
const express = require('express')
const router = express.Router()
const {createOrder, showOrder}=require('../controllers/test2')



router.get('/', showOrder);


router.post('/', createOrder)
// router.get('/', showUsers)
// router.route('/:id')
// .get(showSingleUser)
// .put(updateUser)
// .delete(deleteUser)





module.exports = router