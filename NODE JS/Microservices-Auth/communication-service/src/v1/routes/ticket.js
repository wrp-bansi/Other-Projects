const express = require("express");
const ticketsController = require("../controllers/ticket");
const { isValidPermissions } = require("../../v1/middleware/admin-auth");
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const { TICKETS } = require('../config/assign-permission');
const { authenticateAndValidateRole } = require("../middleware/user-auth");

const router = express.Router();

// Define routes
router.get("/admin/tickets/view-all",isValidPermissions(TICKETS.GET), ticketsController.getAllTicketswithpagination);
router.get("/admin/tickets/",isValidPermissions(TICKETS.GET), ticketsController.getAllTickets);
router.get("/user/tickets/view-all", authenticateAndValidateRole(['2','1']), ticketsController.viewUserTicket);
router.get("/tickets/:ticketId",ticketsController.getTicketById);
router.post("/user/tickets/create", [validate(rules.createTicket)], authenticateAndValidateRole(['2','1']), ticketsController.createTicket);
router.put("/user/tickets/update/:ticketId", [validate(rules.updateComments)], authenticateAndValidateRole(['2','1']), ticketsController.updateComments);
router.delete("/admin/tickets/delete/:ticketId",isValidPermissions(TICKETS.DELETE), [validate(rules.deleteTicket)], ticketsController.deleteTicket);
router.post("/admin/tickets/bulk-delete",isValidPermissions(TICKETS.DELETE), [validate(rules.bulkDeleteTickets)],ticketsController.bulkDeleteTickets);
router.put('/admin/tickets/update/status/:ticketId',isValidPermissions(TICKETS.UPDATE),[validate(rules.updateTicketStatus)], ticketsController.updateTicketStatus)

module.exports = router;
