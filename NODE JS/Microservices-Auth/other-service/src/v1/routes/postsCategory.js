const express = require("express");
const postCategoryController = require("../controllers/postsCategory");
const { isValidPermissions } = require("../../v1/middleware/admin-auth");
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const { POST_CATEGORY } = require('../config/assign-permission');

const router = express.Router();

// Define routes
router.get("/view-all", isValidPermissions(POST_CATEGORY.GET), postCategoryController.getPostCategoryWithPagination);
router.get("/", isValidPermissions(POST_CATEGORY.GET), postCategoryController.getAllPostsCategory);
router.get("/:postCategoryId", isValidPermissions(POST_CATEGORY.GET), postCategoryController.getPostCategoryById);
router.post("/create", [validate(rules.createPostCategory)], postCategoryController.createPostCategory);
router.put("/update/:postCategoryId", [validate(rules.updatePostCategory)], isValidPermissions(POST_CATEGORY.UPDATE), postCategoryController.updatePostCategory);
router.delete("/delete/:postCategoryId", [validate(rules.deletePostCategory)], isValidPermissions(POST_CATEGORY.DELETE), postCategoryController.deletePostCategory);
router.post("/bulk-delete", isValidPermissions(POST_CATEGORY.DELETE), postCategoryController.bulkDeletePostsCategory);
router.put('/update/status/:postCategoryId',[validate(rules.updatePostCategoryStatus)], isValidPermissions(POST_CATEGORY.UPDATE),postCategoryController.updatePostCategoryStatus)


module.exports = router;
