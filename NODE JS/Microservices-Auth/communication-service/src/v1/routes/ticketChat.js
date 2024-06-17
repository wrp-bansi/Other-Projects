const express = require("express");
const ticketChatsController = require("../controllers/ticketChat");
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const { TICKET_CHATS } = require('../config/assign-permission');
const { checkPermissionsAndRoles } = require("../middleware/permissions-Roles");

const router = express.Router();

// Define routes
router.get("/ticket-chats/view-all", ticketChatsController.getAllTicketChatswithpagination);
router.get("/ticket-chats/", ticketChatsController.getAllTicketChats);
router.get("/ticket-chats/ticket/:ticketId", ticketChatsController.getTicketChatsByTicketId);
router.get('/ticket-chats/view-all', checkPermissionsAndRoles(TICKET_CHATS.GET),ticketChatsController.viewUserTicketChats);
router.get("/ticket-chats/:ticketChatId", ticketChatsController.getTicketChatById);
router.post("/ticket-chats/create", [validate(rules.createTicketChat)], checkPermissionsAndRoles(TICKET_CHATS.CREATE), ticketChatsController.createTicketChat);
router.put("/ticket-chats/update/:ticketChatId", [validate(rules.updateTicketChat)], ticketChatsController.updateTicketChat);
router.delete("/ticket-chats/delete/:ticketChatId", [validate(rules.deleteTicketChat)], ticketChatsController.deleteTicketChat);
router.post("/ticket-chats/bulk-delete", [validate(rules.bulkDeleteTicketChats)],ticketChatsController.bulkDeleteTicketChats);
router.put('/ticket-chats/update/status/:ticketChatId',[validate(rules.updateTicketChatStatus)],ticketChatsController.updateTicketChatStatus)

module.exports = router;
