const express = require("express");
const emailTemplatesController = require("../controllers/emailTemplate");
const { isValidPermissions } = require("../../v1/middleware/admin-auth");
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const { EMAIL_TEMPLATES } = require('../config/assign-permission');

const router = express.Router();

// Define routes
router.get("/view-all", isValidPermissions(EMAIL_TEMPLATES.GET), emailTemplatesController.getEmailTemplatesWithPagination);
router.get("/", isValidPermissions(EMAIL_TEMPLATES.GET), emailTemplatesController.getAllEmailTemplates);
router.get("/variable", isValidPermissions(EMAIL_TEMPLATES.GET), emailTemplatesController.getTemplateVariables);
router.get("/:id", isValidPermissions(EMAIL_TEMPLATES.GET), emailTemplatesController.getEmailTemplateById);
router.post("/create/", [validate(rules.createEmailTemplate)], isValidPermissions(EMAIL_TEMPLATES.CREATE), emailTemplatesController.createEmailTemplate);
router.put("/update/:id", [validate(rules.updateEmailTemplate)], isValidPermissions(EMAIL_TEMPLATES.UPDATE), emailTemplatesController.updateEmailTemplate);
router.delete("/delete/:id", [validate(rules.deleteEmailTemplate)], isValidPermissions(EMAIL_TEMPLATES.DELETE), emailTemplatesController.deleteEmailTemplate);
router.post("/bulk-delete", [validate(rules.bulkDeleteEmailTemplates)],isValidPermissions(EMAIL_TEMPLATES.DELETE), emailTemplatesController.bulkDeleteEmailTemplates);
router.put('/update/status/:id',[validate(rules.updateEmailTemplateStatus)], isValidPermissions(EMAIL_TEMPLATES.UPDATE),emailTemplatesController.updateEmailTemplateStatus)


module.exports = router;
