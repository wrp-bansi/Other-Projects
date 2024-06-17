
const express = require('express');
const router = express.Router();
// const { signUpValidation } = require('../middleware/validation');
const { createTeam,getAllTeamsWithDevelopers } = require('../controllers/team');

router.route('/team')
.post( createTeam)
.get(getAllTeamsWithDevelopers)

module.exports = router;
