const TicketChat = require("../models/ticketChat");

//Get All Tickets with pagination
async function getTicketChatswithpagination(whereParams) {
  const data = await TicketChat.findAndCountAll(whereParams);

  // If no Ticket chates found, throw an error
  if (!data || data.rows.length === 0) {
    return {
      rows: []
    }
  }
  return data;
}

async function getAllTicketChats(whereParams) {
  const data = await TicketChat.findAll({
    where: whereParams
  });
  return data;
}

async function getOneTicketChat(whereParams) {
  const data = await TicketChat.findOne({
    where: whereParams,
  });
  if (!data) throw new Error("Ticket chat not found");
  return data;
}

async function createTicketChat(createParams) {
  const ticketChat = await TicketChat.create({ ...createParams });
  return ticketChat;
}

async function updateTicketChat(updateParams, ticketChatData) {
  // Check if the ticket chat exists
  const existingTicketChat = await getOneTicketChat(updateParams);
  if (!existingTicketChat) {
    throw new Error("Ticket chat not found");
  }
  // Ticket chat exists, proceed with the update
  await existingTicketChat.update(ticketChatData);
  // Return the updated ticket chat
  return existingTicketChat;
}

async function deleteTicketChat(whereParams) {
  const data = await TicketChat.destroy({ where: whereParams });
  if (data === 0) {
    throw new Error("Ticket chat not found");
  }
  return { msg: "Ticket chat deleted successfully" };
}

module.exports = { getAllTicketChats, getOneTicketChat, createTicketChat, updateTicketChat, deleteTicketChat,getTicketChatswithpagination };
