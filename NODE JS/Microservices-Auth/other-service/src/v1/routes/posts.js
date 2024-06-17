const express = require("express");
const PostController = require("../controllers/posts");
const { isValidPermissions } = require("../../v1/middleware/admin-auth");
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const { POST } = require('../config/assign-permission');

const router = express.Router();

// Define routes
router.get("/view-all", isValidPermissions(POST.GET), PostController.getPostsWithPagination);
router.get("/", isValidPermissions(POST.GET), PostController.getAllPosts);
router.get("/page/:slug", PostController.getPageBySlug);
router.get("/:postId", isValidPermissions(POST.GET), PostController.getPostById);
router.post("/create/", [validate(rules.createPost)], PostController.createPost);
router.put("/update/:postId", [validate(rules.updatePost)], isValidPermissions(POST.UPDATE), PostController.updatePost);
router.delete("/delete/:postId", [validate(rules.deletePost)], isValidPermissions(POST.DELETE), PostController.deletePost);
router.post("/bulk-delete", isValidPermissions(POST.DELETE), PostController.bulkDeletePosts);


module.exports = router;
