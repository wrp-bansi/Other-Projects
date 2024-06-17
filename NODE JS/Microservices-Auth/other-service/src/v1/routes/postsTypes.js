const express = require("express");
const postTypesController = require("../controllers/postsTypes");
const { isValidPermissions } = require("../../v1/middleware/admin-auth");
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const { POST_TYPES } = require('../config/assign-permission');

const router = express.Router();

// Define routes
router.get("/view-all", isValidPermissions(POST_TYPES.GET), postTypesController.getPostTypesWithPagination);
router.get("/", isValidPermissions(POST_TYPES.GET), postTypesController.getAllPostsTypes);
router.get("/:postTypeId", isValidPermissions(POST_TYPES.GET), postTypesController.getPostTypeById);
router.post("/create", [validate(rules.createPostType)], postTypesController.createPostType);
router.put("/update/:postTypeId", [validate(rules.updatePostType)], isValidPermissions(POST_TYPES.UPDATE), postTypesController.updatePostType);
router.delete("/delete/:postTypeId", [validate(rules.deletePostType)], isValidPermissions(POST_TYPES.DELETE), postTypesController.deletePostType);
router.post("/bulk-delete", isValidPermissions(POST_TYPES.DELETE), postTypesController.bulkDeletePostsTypes);


module.exports = router;
