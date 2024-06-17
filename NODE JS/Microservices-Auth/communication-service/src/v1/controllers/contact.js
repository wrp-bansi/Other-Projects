const {getContactsWithPagination,getAllContacts,getOneContact,createContact,deleteContact} = require("../services/contact");
const { Op } = require("sequelize");
const { getOneEmailTemplate } = require("../services/emailTemplate");

const contactController = {

  // Get All Contacts without Pagination
  getAllContacts: async (req, res) => {
    try {
      const data = await getAllContacts();
      res.status(200).json({ error: false, msg: "Retrieved all contacts successfully", data:{rows:data} });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Get One Contact
  getContactById: async (req, res) => {
    const { contactId } = req.params;
    try {
      const contact = await getOneContact({ contactId });
      res.status(200).json({ error: false, msg: "Contact found successfully", data: contact });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Create Contact
  createContact: async (req, res) => {
    const { firstName, lastName, email, mobile, subject, message } = req.body;
    const userData = { firstName, lastName, email, mobile, subject, message };
    try {
      const contact = await createContact(userData);
      // Replace placeholders in the email template
      const emailTemplate = await getOneEmailTemplate({ slug: 'contact-us-form-submission' });
      if (!emailTemplate) {
        throw new Error("Email Template not found");
      }

      // Replace placeholders in the email template
      let replacedTemplate = emailTemplate.bodyHtml;
      replacedTemplate = replacedTemplate.replace(/{firstName}/g, userData.firstName);
      replacedTemplate = replacedTemplate.replace(/{lastName}/g, userData.lastName);
      replacedTemplate = replacedTemplate.replace(/{email}/g, userData.email);
      replacedTemplate = replacedTemplate.replace(/{mobile}/g, userData.mobile);
      replacedTemplate = replacedTemplate.replace(/{subject}/g, userData.subject);
      replacedTemplate = replacedTemplate.replace(/{message}/g, userData.message);

      const method = 'POST';
      const sendemailurl=process.env.SEND_EMAIL_URL;
      const headers = { 'Content-Type': 'application/json' };
      // Send email to the admin
      const emailApiResponse = await global.common.callMicroServiceApi(method,sendemailurl, {
        templateName: 'contact-us-form-submission',
        fromEmail:email,
        toEmail:process.env.EMAIL_ADMIN,
        userData: userData,
        emailBody: replacedTemplate
      }, headers);
      if (emailApiResponse.error) {
        throw new Error('Error from send email:', emailApiResponse.msg);
      }

      res.status(200).json({ error: false, msg: "Contact created successfully", data: contact });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Delete Contact
  deleteContact: async (req, res) => {
    const { contactId } = req.params;
    try {
      await deleteContact({ contactId });
      res.status(200).json({ error: false, msg: "Contact deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Get Contacts with Pagination
  getContactsWithPagination: async (req, res) => {
    try {
      const { orderBy = "contactId", order = "DESC", search = "", filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      // Construct the where clause for filtering
      let whereClause = { ...filter };
      if (search !== "") {
        whereClause = {
          ...whereClause,
          [Op.or]: {
            firstName: { [Op.like]: `%${search}%` },
            lastName: { [Op.like]: `%${search}%` },
            email: { [Op.like]: `%${search}%` },
            mobile: { [Op.like]: `%${search}%` },
            subject: { [Op.like]: `%${search}%` },
            message: { [Op.like]: `%${search}%` },
          },
        };
      }

      // Get Contacts with pagination and apply filter
      const data = await getContactsWithPagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],});

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allContacts = await getAllContacts(whereClause);
        responseData = { error: false, msg: "Show all contacts", data: {rows:allContacts} };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show all contacts with pagination",
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
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Bulk Delete Contacts
  bulkDeleteContacts: async (req, res) => {
    const { contactIds } = req.body; // Assuming an array of contact IDs is sent in the request body
    try {
    // Perform bulk delete
      await deleteContact({ contactId: { [Op.in]: contactIds } });
      res.status(200).json({ error: false, msg: "Contacts deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  }
};

module.exports = contactController;
