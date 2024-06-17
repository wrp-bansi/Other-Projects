const Contact = require("../models/contact");

// Get All Contacts with Pagination
async function getContactsWithPagination(whereParams, otherdata) {
  const data = await Contact.findAndCountAll({
    ...whereParams,
    ...otherdata,
  });

  if (!data || data.rows.length === 0) {
    return {
      rows: []
    }
  }

  return data;
}

// Get All Contacts without Pagination
async function getAllContacts(whereParams) {
  const data = await Contact.findAll({
    where: whereParams
  });

  return data;
}

// Get One Contact
async function getOneContact(whereParams) {
  const data = await Contact.findOne({ where: whereParams });
  if (!data) throw new Error("Contact not found");
  return data;
}

// Create Contact
async function createContact(contactData) {
  const contact = await Contact.create(contactData);
  if (contact) {
    return contact;
  } else {
    throw new Error("Contact not created");
  }
}

// Delete Contact
async function deleteContact(whereParams) {
  const data = await Contact.destroy({ where: whereParams });
  if (data === 0) {
    throw new Error("Contact not found");
  }
  return { msg: "Contact deleted successfully" };
}

module.exports = {
  getContactsWithPagination,
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact
};
