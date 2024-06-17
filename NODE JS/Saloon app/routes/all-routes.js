
const express = require('express');
const router = express.Router();
const { authenticateToken} = require('../middleware/authenticate-token')
const { signup, login } = require('../controllers/login-sigup');
const { getSaloon, getBarber } = require('../controllers/get-saloonbarber')
const { addSaloon} = require('../controllers/add-saloon')
const { addSaloonRating, addBarberRating } = require('../controllers/add-rating')
const { addBarber, addOwner } = require('../controllers/add-ownerbarber')
const { validateSignup, validateLogin } = require('../middleware/user-validation');
const { User } = require('../models');



const checkOwnerRole = async (req, res, next) => {
    try {
        const ownerId = req.user.id;
        const owner = await User.findOne({ where: { id: ownerId,role: 'owner' } });
        if (!owner) {
            return res.status(403).json({ message: 'User is not an owner' });
        }
        // If user is an owner, continue to the next middleware
        next();
    } catch (error) {
        console.error('Error checking owner role:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//login-sigin
router.post('/signin',validateSignup, signup);
router.post('/login', validateLogin, login)

//get salon and barber
router.get('/getsaloon',authenticateToken, getSaloon)
router.get('/getbarber',authenticateToken, getBarber)

//add-saloon
router.post('/addsaloon',authenticateToken,checkOwnerRole, addSaloon)


//add saloon and barber ratting
router.post('/addsaloonratting',authenticateToken, addSaloonRating)
router.post('/addbarberrating', authenticateToken,addBarberRating)

//add barber and owner
router.post('/addbarber',authenticateToken, addBarber)
router.post('/addowner', addOwner)


module.exports = router;
