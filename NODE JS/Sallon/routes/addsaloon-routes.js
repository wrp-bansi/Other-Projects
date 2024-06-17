const express = require('express');
const router = express.Router();
const { authenticateToken,authorizeOwner} = require('../middleware/authenticate-token')
const { addSaloon } = require('../controllers/add-saloon')




/**
 * @swagger
 * components:
 *   schemas:
 *     Saloon:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the saloon.
 *         saloonName:
 *           type: string
 *           description: The name of the saloon.
 *         mobileNumber:
 *           type: string
 *           description: The mobile number of the saloon.
 *         ratting:
 *           type: string
 *           description: The rating of the saloon.
 *         ownerId:
 *           type: string
 *           description: The ID of the owner of the saloon.
 *       example:
 *         id: 15
 *         saloonName: "jalaram"
 *         mobileNumber: "123444"
 *         ratting: "5"
 *         ownerId: "4"
 *
 *     AddSaloonResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           description: Indicates if there is an error.
 *         data:
 *           $ref: '#/components/schemas/Saloon'
 *         msg:
 *           type: string
 *           description: A message indicating the result of the operation.
 *       example:
 *         error: false
 *         data:
 *           id: 15
 *           saloonName: "jalaram"
 *           mobileNumber: "123444"
 *           ratting: "5"
 *           ownerId: "4"
 *           updatedAt: "2024-03-18T06:20:17.259Z"
 *           createdAt: "2024-03-18T06:20:17.259Z"
 *         msg: "saloon added successfully"
 */

/**
 * @swagger
 * /api/addsaloon:
 *   post:
 *     summary: Add a new saloon
 *     description: Add a new saloon to the database.
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Saloon'
 *     responses:
 *       200:
 *         description: A new saloon is added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddSaloonResponse'
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


//add-saloon
router.post('/addsaloon', addSaloon)


module.exports = router;