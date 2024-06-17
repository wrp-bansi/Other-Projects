
const express = require('express');
const router = express.Router();
// const { signUpValidation } = require('../middleware/validation');
const { getDeveloperByEmail,getDevelopersSortedByDOB } = require('../controllers/developer');


router.route('/developer')
.get(getDevelopersSortedByDOB)

router.route('/developer/:email')
.get(getDeveloperByEmail)

module.exports = router;
