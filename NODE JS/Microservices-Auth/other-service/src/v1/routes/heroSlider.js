const express = require("express");
const heroSliderController = require("../controllers/heroSlider");
const { isValidPermissions } = require("../../v1/middleware/admin-auth");
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const { HERO_SLIDERS } = require('../config/assign-permission');

const router = express.Router();

// Define routes
router.get("/customer/hero-slider/view-all", heroSliderController.getHeroSlidersWithPagination);
router.get("/admin/hero-slider/",isValidPermissions(HERO_SLIDERS.GET), heroSliderController.getAllHeroSliders);
router.get("/admin/hero-slider/:heroSliderId", isValidPermissions(HERO_SLIDERS.GET), heroSliderController.getHeroSliderById);
router.post("/admin/hero-slider/create", [validate(rules.createHeroSlider)], isValidPermissions(HERO_SLIDERS.CREATE), heroSliderController.createHeroSlider);
router.put("/admin/hero-slider/update/:heroSliderId", [validate(rules.updateHeroSlider)], isValidPermissions(HERO_SLIDERS.UPDATE), heroSliderController.updateHeroSlider);
router.delete("/admin/hero-slider/delete/:heroSliderId", [validate(rules.deleteHeroSlider)], isValidPermissions(HERO_SLIDERS.DELETE), heroSliderController.deleteHeroSlider);
router.post("/admin/hero-slider/bulk-delete",[validate(rules.bulkDeleteHeroSliders)], isValidPermissions(HERO_SLIDERS.DELETE), heroSliderController.bulkDeleteHeroSliders);


module.exports = router;
