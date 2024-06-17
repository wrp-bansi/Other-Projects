const express = require("express");
const contactController = require("../controllers/contact");
const { isValidPermissions } = require("../../v1/middleware/admin-auth");
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const { CONTACT } = require('../config/assign-permission');

const router = express.Router();

// Define routes
router.get("/admin/contact/view-all", isValidPermissions(CONTACT.GET), contactController.getContactsWithPagination);
router.get("/admin/contact/", isValidPermissions(CONTACT.GET), contactController.getAllContacts);
router.get("/admin/contact/:contactId", isValidPermissions(CONTACT.GET), contactController.getContactById);
router.post("/customer/contact/create",[validate(rules.createContact)],contactController.createContact);
router.delete("/admin/contact/delete/:contactId",[validate(rules.deleteContact)], isValidPermissions(CONTACT.DELETE), contactController.deleteContact);
router.post("/admin/contact/bulk-delete",[validate(rules.bulkDeleteContacts)],isValidPermissions(CONTACT.DELETE), contactController.bulkDeleteContacts);

module.exports = router;
