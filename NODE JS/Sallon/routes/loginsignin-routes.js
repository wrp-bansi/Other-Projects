const express = require('express');
const router = express.Router();
const { validateSignup, validateLogin } = require('../middleware/user-validation');
const { signup, login } = require('../controllers/login-sigup');



/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - mobileNumber
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generating ID of the user.
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user.
 *         mobileNumber:
 *           type: string
 *           description: The mobile number of the user.
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           description: The role of the user. Can be either "admin" or "user".
 *       example:
 *         id: 1
 *         firstName: John
 *         lastName: Doe
 *         email: johndoe@example.com
 *         password: password123
 *         mobileNumber: "+1234567890"
 *         role: user
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignup:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - mobileNumber
 *         - role
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user.
 *         mobileNumber:
 *           type: string
 *           description: The mobile number of the user.
 *         role:
 *           type: string
 *           enum: [owner, user]
 *           description: The role of the user. Can be either "admin" or "user".
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: johndoe@example.com
 *         password: password123
 *         mobileNumber: "+1234567890"
 *         role: user
 *
 *     UserResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           description: Indicates if there is an error.
 *         data:
 *           $ref: '#/components/schemas/User'
 *         msg:
 *           type: string
 *           description: A message indicating the result of the operation.
 *       example:
 *         error: false
 *         data:
 *           id: 1
 *           firstName: John
 *           lastName: Doe
 *           email: johndoe@example.com
 *           mobileNumber: "+1234567890"
 *           role: user
 *         msg: Signup successfully
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
 *         msg: User already exists
 */

/**
 * @swagger
 * /api/signin:
 *   post:
 *     summary: Sign up a new user
 *     description: Sign up a new user with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       201:
 *         description: User signed up successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Bad request. User already exists or missing required fields.
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


router.post('/signin',validateSignup, signup);

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user.
 *       example:
 *         email: johndoe@example.com
 *         password: password123
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           description: Indicates if there is an error.
 *         data:
 *           $ref: '#/components/schemas/User'
 *         token:
 *           type: string
 *           description: JWT token for authentication.
 *         msg:
 *           type: string
 *           description: A message indicating the result of the operation.
 *       example:
 *         error: false
 *         data:
 *           id: 1
 *           firstName: John
 *           lastName: Doe
 *           email: johndoe@example.com
 *           mobileNumber: "+1234567890"
 *           role: user
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MzQ1MTA4NDksImV4cCI6MTYzNDUxNDQ0OX0.1Nl4wmUQnRifmxEWU6e8OKJqMq66LBs65v08Z0gIRPQ
 *         msg: Login successful
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in an existing user
 *     description: Log in an existing user with the provided credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Bad request. User not found or invalid credentials.
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




router.post('/login', validateLogin, login)


module.exports = router;