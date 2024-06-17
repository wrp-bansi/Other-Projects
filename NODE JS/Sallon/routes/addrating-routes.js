const express = require('express');
const router = express.Router();
const { authenticateToken,authorizeUser } = require('../middleware/authenticate-token')
const { addSaloonRating, addBarberRating } = require('../controllers/add-rating')

//add saloon and barber ratting

/**
 * @swagger
 * components:
 *   schemas:
 *     SaloonRating:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the saloon rating.
 *         saloonId:
 *           type: string
 *           description: The ID of the saloon being rated.
 *         ratting:
 *           type: string
 *           description: The rating given to the saloon.
 *         userId:
 *           type: string
 *           description: The ID of the user who rated the saloon.
 *       example:
 *         id: 10
 *         saloonId: "3"
 *         ratting: "2"
 *         userId: "1"
 *
 *     AddSaloonRatingResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           description: Indicates if there is an error.
 *         data:
 *           $ref: '#/components/schemas/SaloonRating'
 *         msg:
 *           type: string
 *           description: A message indicating the result of the operation.
 *       example:
 *         error: false
 *         data:
 *           id: 10
 *           saloonId: "3"
 *           ratting: "2"
 *           userId: "1"
 *           updatedAt: "2024-03-18T06:33:26.782Z"
 *           createdAt: "2024-03-18T06:33:26.782Z"
 *         msg: "saloonRatting added successfully"
 */

/**
 * @swagger
 * /api/addsaloonratting:
 *   post:
 *     summary: Add a rating to a saloon
 *     description: Add a rating to a saloon by providing the saloon ID, rating, and user ID.
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaloonRating'
 *     responses:
 *       201:
 *         description: A new rating is added to the saloon successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddSaloonRatingResponse'
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden. Access denied.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 */


router.post('/addsaloonratting', addSaloonRating)


/**
 * @swagger
 * components:
 *   schemas:
 *     BarberRating:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the barber rating.
 *         barberId:
 *           type: string
 *           description: The ID of the barber being rated.
 *         ratting:
 *           type: string
 *           description: The rating given to the barber.
 *         userId:
 *           type: string
 *           description: The ID of the user who rated the barber.
 *       example:
 *         id: 10
 *         barberId: "3"
 *         ratting: "2"
 *         userId: "1"
 *
 *     AddBarberRatingResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           description: Indicates if there is an error.
 *         data:
 *           $ref: '#/components/schemas/BarberRating'
 *         msg:
 *           type: string
 *           description: A message indicating the result of the operation.
 *       example:
 *         error: false
 *         data:
 *           id: 10
 *           barberId: "3"
 *           ratting: "2"
 *           userId: "1"
 *           updatedAt: "2024-03-18T06:33:26.782Z"
 *           createdAt: "2024-03-18T06:33:26.782Z"
 *         msg: "barberRatting added successfully"
 */

/**
 * @swagger
 * /api/addbarberrating:
 *   post:
 *     summary: Add a rating to a barber
 *     description: Add a rating to a barber by providing the barber ID, rating, and user ID.
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BarberRating'
 *     responses:
 *       201:
 *         description: A new rating is added to the barber successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddBarberRatingResponse'
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden. Access denied.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.post('/addbarberrating',addBarberRating)

module.exports = router;