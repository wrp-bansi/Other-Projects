
const express = require('express')
const router = express.Router()
const {showUsers, createUsers, showSingleUser, updateUser, deleteUser}=require('../controllers/test')


router.post('/', createUsers)
router.get('/', showUsers)
router.route('/:id')
.get(showSingleUser)
.put(updateUser)
.delete(deleteUser)


module.exports = router