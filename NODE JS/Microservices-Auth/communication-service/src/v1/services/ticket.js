const Ticket = require("../models/ticket");

//Get All Tickets with pagination
async function getTicketwithpagination(whereParams) {
  const data = await Ticket.findAndCountAll(whereParams);

  // If no Ticket found, throw an error
  if (!data || data.rows.length === 0) {
    return {
      rows: []
    }
  }
  return data;
}

//Get All Tickets without pagination
async function getAllTickets(whereParams) {

  const data = await Ticket.findAll({
    where: whereParams
  });
  return data;
}
async function getTicketCount(whereParams){
  const data = await Ticket.count({
    where: whereParams
  });
  return data;
}

async function getOneTicket(whereParams, orderParams = [["id", "DESC"]]) {
  const data = await Ticket.findOne({
    where: whereParams,
    order: orderParams,
  });
  if (!data) throw new Error("Ticket not found");
  return data;
}

//Create Ticket
async function createTicket(createParams) {
  const ticket = await Ticket.create({ ...createParams });
  return ticket;

}

//Update Ticket
async function updateTicket(updateParams,TicketData) {
  // Check if the Ticket exists
  const existingTicket = await getOneTicket(updateParams);
  if (!existingTicket) {
    throw new Error("Ticket not found");
  }
  // Ticket exists proceed with the update
  await existingTicket.update(TicketData);
  // Return the updated Ticket
  return existingTicket;
}

// Delete Ticket
async function deleteTicket(whereParams) {
  const data = await Ticket.destroy({ where: whereParams })
  if (data === 0) {
    throw new Error("Ticket not found");
  }
  return { msg: "Ticket deleted successfully" };
}


module.exports = { getAllTickets, getOneTicket, createTicket, updateTicket, deleteTicket, getTicketwithpagination,getTicketCount };
