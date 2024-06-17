const express = require("express");
const role = require("../controllers/role");
const { isValidPermissions } = require("../middleware/auth");

const router = express.Router();

// /**
//  * @swagger
//  * /v1/role/role-permission:
//  *   get:
//  *     summary: Check if Get Method is Role Wise Permission
//  *     description: This API is used to check if the GET method is working.
//  *     responses:
//  *       200:
//  *         description: Successful response to test GET method.
//  *
//  */


/**
 * @swagger
 * /v1/role/role-permission:
 *   get:
 *     summary: Get Role Wise Permission
 *     description: Retrieve role-wise permissions.
 *     responses:
 *       200:
 *         description: Successful response to fetch role permissions.
 */

/**
 * @swagger
 * /v1/role:
 *   get:
 *     summary: Get All Roles
 *     description: Retrieve all roles.
 *     responses:
 *       200:
 *         description: Successful response to fetch all roles.
 *         content:
 *           application/json
 */

/**
 * @swagger
 * /v1/role/{nId}:
 *   get:
 *     summary: Get Role by ID
 *     description: Retrieve a role by its ID.
 *     parameters:
 *       - in: path
 *         name: nId
 *         description: ID of the role to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response to fetch a role by ID.
 *         content:
 *           application/json
 *   put:
 *     summary: Update Role
 *     description: Update a role by its ID.
 *     parameters:
 *       - in: path
 *         name: nId
 *         description: ID of the role to update
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response to update a role.
 *   delete:
 *     summary: Delete Role
 *     description: Delete a role by its ID.
 *     parameters:
 *       - in: path
 *         name: nId
 *         description: ID of the role to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response to delete a role.
 *   post:
 *     summary: Create Role
 *     description: Create a new role.
 *     responses:
 *       200:
 *         description: Successful response to create a role.
 */

// Define routes
// router.get(
//     "/role-permission",
//     isValidPermissions(4),
//     role.getRoleByIdPermission
//   );
router.get('/all',isValidPermissions(4),role.getAllRolewithpagination)
  router.get("/",isValidPermissions(4),  role.getAllRoles);
  router.get("/:roleId", isValidPermissions(4), role.getRoleById);
  router.post("/", isValidPermissions(7), role.createRole);
  router.put("/:roleId", isValidPermissions(10), role.updateRole);
  router.delete("/:roleId", isValidPermissions(13), role.deleteRole);

  module.exports = router;
