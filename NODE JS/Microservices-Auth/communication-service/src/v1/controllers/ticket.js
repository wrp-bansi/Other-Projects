const { getAllTickets, getOneTicket, createTicket, updateTicket, deleteTicket, getTicketwithpagination, getTicketCount } = require("../services/ticket");
const { Op } = require("sequelize");
const logger = require('../helpers/logger-helper');


const TicketsApi = {

  //Get All Tickets with pagination
  getAllTicketswithpagination: async (req, res) => {
    try {
      const { orderBy = "id", order = "DESC", status, type, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      // Construct the where clause for filtering
      const whereClause = {};
      if (status) {
        whereClause.status = status;
      }
      if (type) {
        whereClause.type = type;
      }
      // Get Ticket counts for "open" and "closed" statuses
      const openCount = await getTicketCount({ status: "open" });
      const closedCount = await getTicketCount({ status: "closed" });

      // Get Tickets with pagination and apply filter
      const data = await getTicketwithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allTickets = await getAllTickets(whereClause);
        responseData = { error: false, msg: "Show All Tickets", data: {rows: allTickets} };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All allTickets with Pagination",
          data: {
            count: data.count,
            rows: data.rows,
            perPage,
            currentPage,
            totalPages: Math.ceil(data.count / perPage),
            open: openCount,
            closed: closedCount
          }
        };
      }

      return res.status(200).json(responseData);

    } catch (error) {
      console.error("Error occurred while fetching Tickets:", error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Get All Tickets without pagination
  getAllTickets: async (req, res) => {
    try {
      // Fetch all Tickets
      const tickets = await getAllTickets();

      // Return the User notifications in the response
      return res.status(200).send({ error: false, msg: "Tickets fetched sucessfully", data:{rows: tickets} });
    } catch (error) {
      // Handle errors
      logger.error(error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Get One Ticket
  getTicketById: async (req, res) => {
    const { ticketId } = req.params
    try {
      const ticket = await getOneTicket({id: ticketId });
      res.status(200).json({ error: false, msg: "Ticket found successfully", data: ticket });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Create Ticket
  createTicket: async (req, res) => {
    try {
      const {requestedBy, email, type, subject, description, status, attachment, priority } = req.body;
      const userId = req.user.userId;
      const ticketData = { userId, requestedBy, email, type, subject, description, status: status || 'open', attachment, priority: priority || 'low' };

      // Create ticket
      const newTicket = await createTicket(ticketData);
      // Create notification
      const notificationData = {
        userId: userId,
        message: 'A new ticket has been created.',
        redirectType: "ticket",
        status: 'unread',
        referenceId: newTicket.id,
      };
      const method = 'POST';
      const notificationurl = process.env.CREATE_NOTIFICATION_URL;
      const headers = { 'Content-Type': 'application/json' };
      const notificationApiResponse = await global.common.callMicroServiceApi(method, notificationurl, notificationData, headers);

      if (notificationApiResponse.error) {
        throw new Error(notificationApiResponse.msg);
      }
      // Return success response
      return res.status(200).send({ error: false, msg: "Ticket created sucessfully" });
    } catch (error) {
      // Handle errors
      logger.error(error);
      return res.status(400).send({ error: true, msg: error.message});
    }
  },

  // Update comments
  updateComments: async (req, res) => {
    const { ticketId } = req.params;
    const { comment } = req.body;
    const userId = req.user.userId;

    try {
      // Fetch the ticket
      const ticket = await getOneTicket({ id: ticketId });
      // Check if the ticket belongs to the logged-in user
      if (ticket.userId !== userId) {
        return res.status(403).json({ error: true, msg: "You are not authorized to update this ticket" });
      }

      // Add new comment to the comments array
      const newComment = {
        userId: userId,
        comment: comment,
        createdAt: new Date(),
      };
      const updatedComments = [...ticket.comments, newComment];

      // Update the ticket with the new comments array
      await updateTicket({ id: ticketId }, { comments: updatedComments });

      return res.status(200).json({ error: false, msg: "Comment added successfully", data: newComment });
    } catch (error) {
      logger.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Update Ticket Status
  updateTicketStatus: async (req, res) => {
    try {
      const { ticketId } = req.params;
      const {status} = req.body

      const updatedTicket = await updateTicket({ id: ticketId }, { status });
      // Create notification
      const notificationData = {
        userId: updatedTicket.userId,
        message: 'Your ticket status has been updated.',
        redirectType: "ticket",
        status: 'unread',
        referenceId: ticketId,
      };
      const method = 'POST';
      const notificationurl = process.env.CREATE_NOTIFICATION_URL;
      const headers = { 'Content-Type': 'application/json' };
      const notificationApiResponse = await global.common.callMicroServiceApi(method, notificationurl, notificationData, headers);

      if (notificationApiResponse.error) {
        throw new Error(notificationApiResponse.msg);
      }
      return res.status(200).json({ error: false, msg: 'Ticket status updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Delete Ticket
  deleteTicket: async (req, res) => {
    try {
      const { ticketId } = req.params;

      // Find the Ticket by ID and delete it
      await deleteTicket({ id: ticketId });

      // Return success response
      return res.status(200).send({ error: false, msg: "Ticket deleted sucessfully" });
    } catch (error) {
      // Handle errors
      logger.error(error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Bulk-Delete Tickets
  bulkDeleteTickets: async (req, res) => {
    try {
      const { ticketIds } = req.body;
      // Perform bulk delete operation
      await deleteTicket({ id: { [Op.in]: ticketIds } });
      // Return success response
      return res.status(200).json({ error: false, msg: "All Tickets deleted sucessfully" });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

  // view user Ticket
  viewUserTicket: async (req, res) => {
    const userId = req.user.userId;
    try {
      const data = await getAllTickets({userId: userId});
      res.status(200).send({error: false, msg: "Show User Tickets", data});
    } catch (error) {
      logger.error(error);
      res.status(400).send({error: true, msg: error.message});
    }
  },

}

module.exports = TicketsApi;
