const express = require("express");
const categoryController = require("../controllers/categories");
const {isValidPermissions} = require("../../v1/middleware/admin-auth");
const {validate} = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const {CATEGORY} = require('../config/assign-permission');
const router = express.Router();

// Define routes
router.get("/admin/categories/",isValidPermissions(CATEGORY.GET), categoryController.getCategory);
router.get("/admin/categories/view-all", categoryController.getAllCategorieswithPagination);
router.get("/admin/categories/parent", isValidPermissions(CATEGORY.GET), categoryController.getParentCategories);
router.get("/admin/categories/:categoryId", isValidPermissions(CATEGORY.GET), categoryController.getCategoryById);
router.post("/admin/categories/create",[validate(rules.createCategory)], isValidPermissions(CATEGORY.CREATE), categoryController.createCategory);
router.put("/admin/categories/update/:categoryId",[validate(rules.updateCategory)], isValidPermissions(CATEGORY.UPDATE), categoryController.updateCategory);
router.delete("/admin/categories/delete/:categoryId",[validate(rules.deleteCategory)], isValidPermissions(CATEGORY.DELETE), categoryController.deleteCategory);
router.put("/admin/categories/update/status/:categoryId",[validate(rules.updateCategoryStatus)], isValidPermissions(CATEGORY.UPDATE), categoryController.updateCategoryStatus);
router.post("/admin/categories/bulk-delete",[validate(rules.bulkDeleteCategories)], isValidPermissions(CATEGORY.DELETE), categoryController.bulkDeleteCategories);

module.exports = router;
