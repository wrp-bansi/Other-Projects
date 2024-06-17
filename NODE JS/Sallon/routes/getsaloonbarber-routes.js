
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticate-token')
const { getSaloon, getBarber } = require('../controllers/get-saloonbarber')

//get salon and barber

/**
 * @swagger
 * components:
 *   schemas:
 *     Owner:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the owner.
 *         lastName:
 *           type: string
 *           description: The last name of the owner.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the owner.
 *         mobileNumber:
 *           type: integer
 *           description: The mobile number of the owner.
 *
 *     Saloon:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the saloon.
 *         ownerId:
 *           type: integer
 *           description: The ID of the owner of the saloon.
 *         saloonName:
 *           type: string
 *           description: The name of the saloon.
 *         mobileNumber:
 *           type: integer
 *           description: The mobile number of the saloon.
 *         ratting:
 *           type: integer
 *           description: The rating of the saloon.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the saloon was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the saloon was last updated.
 *         owner:
 *           $ref: '#/components/schemas/Owner'
 *       example:
 *         id: 1
 *         ownerId: 1
 *         saloonName: "jems"
 *         mobileNumber: 3333
 *         ratting: 4
 *         createdAt: "2024-03-16T06:57:53.000Z"
 *         updatedAt: "2024-03-16T06:57:53.000Z"
 *         owner:
 *           firstName: "mahesh"
 *           lastName: "lakani"
 *           email: "mahesh@gmail.co"
 *           mobileNumber: 6666666
 *
 *     GetSaloonResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           description: Indicates if there is an error.
 *         data:
 *           type: object
 *           properties:
 *             count:
 *               type: integer
 *               description: The total number of saloons.
 *             rows:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Saloon'
 *         msg:
 *           type: string
 *           description: A message indicating the result of the operation.
 *       example:
 *         error: false
 *         data:
 *           count: 1
 *           rows:
 *             - id: 1
 *               ownerId: 1
 *               saloonName: "jems"
 *               mobileNumber: 3333
 *               ratting: 4
 *               createdAt: "2024-03-16T06:57:53.000Z"
 *               updatedAt: "2024-03-16T06:57:53.000Z"
 *               owner:
 *                 firstName: "mahesh"
 *                 lastName: "lakani"
 *                 email: "mahesh@gmail.co"
 *                 mobileNumber: 6666666
 *         msg: "saloon fetched successfully"
 */

/**
 * @swagger
 * /api/getsaloon:
 *   get:
 *     summary: Get list of saloons
 *     description: Retrieve a list of saloons with their associated owners.
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         description: A list of saloons.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetSaloonResponse'
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
 *       400:
 *         description: Bad request. Error fetching saloons.
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


router.get('/getsaloon', getSaloon)


//get-barber
/**
 * @swagger
 * components:
 *   schemas:
 *     Barber:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the barber.
 *         saloonId:
 *           type: integer
 *           description: The ID of the saloon where the barber works.
 *         firstName:
 *           type: string
 *           description: The first name of the barber.
 *         lastName:
 *           type: string
 *           description: The last name of the barber.
 *         ratting:
 *           type: integer
 *           description: The rating of the barber.
 *         Saloon:
 *           type: object
 *           properties:
 *             ownerId:
 *               type: integer
 *               description: The ID of the owner of the saloon.
 *             saloonName:
 *               type: string
 *               description: The name of the saloon.
 *             mobileNumber:
 *               type: integer
 *               description: The mobile number of the saloon.
 *             ratting:
 *               type: integer
 *               description: The rating of the saloon.
 *             owner:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   description: The first name of the owner.
 *                 lastName:
 *                   type: string
 *                   description: The last name of the owner.
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The email address of the owner.
 *                 mobileNumber:
 *                   type: integer
 *                   description: The mobile number of the owner.
 *       example:
 *         id: 1
 *         saloonId: 1
 *         firstName: "mahesh"
 *         lastName: "lakani"
 *         ratting: 2
 *         createdAt: "2024-03-13T05:15:03.000Z"
 *         updatedAt: "2024-03-13T05:15:03.000Z"
 *         Saloon:
 *           ownerId: 1
 *           saloonName: "jems"
 *           mobileNumber: 3333
 *           ratting: 4
 *           owner:
 *             firstName: "mahesh"
 *             lastName: "lakani"
 *             email: "mahesh@gmail.co"
 *             mobileNumber: 6666666
 *
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           description: Indicates if there is an error.
 *         msg:
 *           type: string
 *           description: A message indicating the error.
 *       example:
 *         error: true
 *         msg: Error fetching barbers
 */

/**
 * @swagger
 * /api/getbarber:
 *   get:
 *     summary: Get list of barbers
 *     description: Retrieve a list of barbers with their associated saloons and owners.
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         description: A list of barbers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: Indicates if there is an error.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Barber'
 *                 msg:
 *                   type: string
 *                   description: A message indicating the result of the operation.
 *       400:
 *         description: Bad request. Error fetching barbers.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
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

router.get('/getbarber', getBarber)


module.exports = router;