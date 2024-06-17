const express = require("express");
const ProductController = require("../controllers/products");
const {isValidPermissions} = require("../../v1/middleware/admin-auth");
const {validate} = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const {PRODUCT} = require('../config/assign-permission');
const { authenticateAndValidateRole } = require("../../../../report-service/src/v1/middleware/user-auth");
const { checkPermissionsAndRoles } = require("../middleware/permissions-Roles");
const router = express.Router();

// Define routes
router.get("/vendor/products/view-all",authenticateAndValidateRole(['1']), ProductController.viewAllProductsWithPagination);
router.get("/admin/products/view-all",isValidPermissions(PRODUCT.GET), ProductController.getAllProductsWithPagination);
router.get("/admin/products/keys",isValidPermissions(PRODUCT.GET), ProductController.getProductKeys);
router.get('/related/:productId',ProductController.getProductWithRelatedProducts);
router.get('/search', ProductController.searchProducts);
router.get("/", isValidPermissions(PRODUCT.GET),ProductController.getAllProducts);
router.get('/top-rated', ProductController.getTopRatedProducts);
router.get("/:productId",ProductController.getProductById);
router.post("/create",[validate(rules.createProduct)], checkPermissionsAndRoles(PRODUCT.CREATE),ProductController.createProduct);
router.post("/recently-view", [validate(rules.getRecentlyViewedProducts)],ProductController.getRecentlyViewedProducts);
router.put("/update/:productId", [validate(rules.updateProduct)],checkPermissionsAndRoles(PRODUCT.UPDATE), ProductController.updateProduct);
router.delete("/delete/:productId",[validate(rules.deleteProduct)], ProductController.deleteProduct);
router.post("/bulk-import", checkPermissionsAndRoles(PRODUCT.UPDATE), ProductController.bulkImportProducts);
router.put("/update/status/:productId",[validate(rules.updateProductStatus)], checkPermissionsAndRoles(PRODUCT.UPDATE), ProductController.updateProductStatus);
router.post("/bulk-delete", [validate(rules.bulkDeleteProducts)],ProductController.bulkDeleteProducts);


module.exports = router;
