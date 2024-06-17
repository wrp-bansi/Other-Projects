const { getAllTicketChats, getOneTicketChat, createTicketChat, updateTicketChat, getTicketChatswithpagination, deleteTicketChat } = require("../services/ticketChat");
const { Op } = require("sequelize");
const logger = require('../helpers/logger-helper');


const TicketChatsApi = {

  //Get All Ticket Chats with pagination
  getAllTicketChatswithpagination: async (req, res) => {
    try {
      const { orderBy = "id", order = "DESC", search = "", filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      // Construct the where clause for filtering
      let whereClause = { ...filter };
      if (search !== "") {
        whereClause = {
          ...whereClause,
          [Op.or]: {
            message: { [Op.like]: `%${search}%` }
          },
        };
      }

      // Get Tickets with pagination and apply filter
      const data = await getTicketChatswithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allTicketchates = await getAllTicketChats(whereClause);
        responseData = { error: false, msg: "Show All Ticket chats", data:{rows: allTicketchates} };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All all Ticket chats with Pagination",
          data: {
            count: data.count,
            rows: data.rows,
            perPage,
            currentPage,
            totalPages: Math.ceil(data.count / perPage)
          }
        };
      }

      return res.status(200).json(responseData);

    } catch (error) {
      console.error("Error occurred while fetching Ticket chats:", error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Get All Ticket Chats
  getAllTicketChats: async (req, res) => {
    try {
      const ticketChats = await getAllTicketChats();
      return res.status(200).send({ error: false, msg: "Ticket chats fetched successfully", data:{rows: ticketChats} });
    } catch (error) {
      logger.error(error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Get One Ticket Chat
  getTicketChatById: async (req, res) => {
    const { ticketChatId } = req.params
    try {
      const ticketChat = await getOneTicketChat({ id: ticketChatId });
      res.status(200).json({ error: false, msg: "Ticket chat found successfully", data: ticketChat });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //get Ticket Chat by ticket Id
  getTicketChatsByTicketId: async (req, res) => {
    const { ticketId } = req.params;

    try {
      const ticketChats = await getAllTicketChats({ ticketId });

      if (ticketChats.length === 0) {
        return res.status(404).send({ error: true, msg: "No ticket chats found for the given ticket ID" });
      }

      return res.status(200).send({ error: false, msg: "Ticket chats fetched successfully", data: ticketChats });
    } catch (error) {
      console.error(error); // Use console.error if logger is not defined
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Create Ticket Chat
  createTicketChat: async (req, res) => {
    try {
      let senderId;
      if (req.body.admin) {
        senderId = req.body.admin.adminId;
      } else if(req.body.user) {
        senderId = req.body.user.userId;
      } else{
        throw new Error("Sender ID not found");
      }
      const { ticketId, receiverId, message, image, status } = req.body;
      const ticketChatData = { ticketId, senderId, receiverId, message, image, status };
      await createTicketChat(ticketChatData);
      return res.status(200).send({ error: false, msg: "Ticket chat created successfully" });
    } catch (error) {
      logger.error(error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  // View Ticket Chats for Admin and User
  viewUserTicketChats: async (req, res) => {
    try {
      let userId;
      if (req.body.admin) {
        userId = req.body.admin.adminId;
      } else if (req.body.user) {
        userId = req.body.user.userId;
      } else {
        throw new Error("User ID not found");
      }

      // Get all ticket chats where either senderId or receiverId matches the user ID
      const ticketChats = await getAllTicketChats({
        [Op.or]: [
          { senderId: userId },
          { receiverId: userId }
        ]
      });

      // Return the ticket chats
      return res.status(200).json({ error: false, msg: "Ticket chats fetched successfully", data: ticketChats });
    } catch (error) {
      logger.error(error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Update Ticket Chat
  updateTicketChat: async (req, res) => {
    const { ticketChatId } = req.params
    const ticketChatData = req.body;
    try {
      await updateTicketChat({ id: ticketChatId }, ticketChatData);
      res.status(200).json({ error: false, msg: "Ticket chat updated successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Update Ticket Chat Status
  updateTicketChatStatus: async (req, res) => {
    try {
      const { ticketChatId } = req.params;
      const {status} = req.body

      await updateTicketChat({ id: ticketChatId }, { status });

      return res.status(200).json({ error: false, msg: 'Ticket chat status updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Delete Ticket Chat
  deleteTicketChat: async (req, res) => {
    try {
      const { ticketChatId } = req.params;
      await deleteTicketChat({ id: ticketChatId });
      return res.status(200).send({ error: false, msg: "Ticket chat deleted successfully" });
    } catch (error) {
      logger.error(error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Bulk-Delete Tickets Chats
  bulkDeleteTicketChats: async (req, res) => {
    try {
      const { ticketChatIds } = req.body;
      // Perform bulk delete operation
      await deleteTicketChat({ id: { [Op.in]: ticketChatIds } });
      // Return success response
      return res.status(200).json({ error: false, msg: "All Ticket chats deleted sucessfully" });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }
}

module.exports = TicketChatsApi;
