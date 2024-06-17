const express = require("express");
const couponController = require("../controllers/coupon");
const { isValidPermissions } = require("../../v1/middleware/admin-auth");
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const { COUPON } = require('../config/assign-permission');
const router = express.Router();

// Define routes
router.get("/check-coupon/:couponCode", isValidPermissions(COUPON.GET), couponController.checkCouponValidity);
router.get("/view-all", isValidPermissions(COUPON.GET), couponController.getAllCouponswithPagination);
router.get("/", isValidPermissions(COUPON.GET), couponController.getAllCoupons);
router.get("/:couponId", isValidPermissions(COUPON.GET), couponController.getCouponById);
router.post("/create", [validate(rules.createCoupon)], isValidPermissions(COUPON.CREATE), couponController.createCoupon);
router.put("/update/:couponId", [validate(rules.updateCoupon)], isValidPermissions(COUPON.UPDATE), couponController.updateCoupon);
router.delete("/delete/:couponId", [validate(rules.deleteCoupon)], isValidPermissions(COUPON.DELETE), couponController.deleteCoupon);
router.put("/update/status/:couponId",[validate(rules.updateCouponStatus)], isValidPermissions(COUPON.UPDATE), couponController.updateCouponStatus);
router.post("/bulk-delete", [validate(rules.bulkDeleteCoupons)],isValidPermissions(COUPON.DELETE), couponController.bulkDeleteCoupons);


module.exports = router;
