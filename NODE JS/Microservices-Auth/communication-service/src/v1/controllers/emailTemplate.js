/* eslint-disable no-prototype-builtins */
const { getAllEmailTemplates, getOneEmailTemplate, createEmailTemplate, updateEmailTemplate, deleteEmailTemplate, getEmailTemplateswithpagination, updateEmailTemplatewithslug, extractVariables } = require("../services/emailTemplate");
const { Op } = require("sequelize");

const EmailTemplatesApi = {

  //Get All Email Templates with pagination
  getEmailTemplatesWithPagination: async (req, res) => {
    try {
      const { orderBy = "id", order = "DESC", search = "", filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      // Construct the where clause for filtering
      let whereClause = { ...filter };
      if (search !== "") {
        whereClause = {
          ...whereClause,
          [Op.or]: {
            templateName: { [Op.like]: `%${search}%` },
            slug: { [Op.like]: `%${search}%` },
            subject: { [Op.like]: `%${search}%` },
          },
        };
      }

      // Get Posts Types with pagination and apply filter
      const data = await getEmailTemplateswithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allPostTypes = await getAllEmailTemplates(whereClause);
        responseData = { error: false, msg: "Show All Email Templates", data:{rows: allPostTypes} };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All Email Templates with Pagination",
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
      console.error("Error occurred while fetching Email Templates:", error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Get All Email Templates without pagination
  getAllEmailTemplates: async (req, res) => {
    try {
      const data = await getAllEmailTemplates();
      res.status(200).json({ error: false, msg: "Show all Email Templates successfully", data:{rows:data} });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Get One Email Template
  getEmailTemplateById: async (req, res) => {
    const { id } = req.params
    try {
      const emailTemplate = await getOneEmailTemplate({ id: id });
      res.status(200).json({ error: false, msg: "Email Template found successfully", data: emailTemplate });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Create Email Template
  createEmailTemplate: async (req, res) => {
    const { templateName, slug, subject, bodyHtml, bodyText, status, description,type } = req.body;
    const emailTemplateData = { templateName, slug, subject, bodyHtml, bodyText, status, description,type };
    try {
      await createEmailTemplate(emailTemplateData);
      res.status(200).json({ error: false, msg: "Email Template created successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Update Email Template
  updateEmailTemplate: async (req, res) => {
    const { id } = req.params
    const emailTemplatesData = req.body;
    try {
      await updateEmailTemplatewithslug({ id: id }, emailTemplatesData);
      res.status(200).json({ error: false, msg: "Email Template updated successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Update Email Template Status
  updateEmailTemplateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      // Update user status and banned reason in the database
      await updateEmailTemplate({ id: id }, { status });
      return res.status(200).json({ error: false, msg: 'Email Template status updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Delete Email Template
  deleteEmailTemplate: async (req, res) => {
    const { id } = req.params
    try {
      await deleteEmailTemplate({ id: id });
      res.status(200).json({ error: false, msg: "Email Template deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Bulk-Delete Email Templates
  bulkDeleteEmailTemplates: async (req, res) => {
    const { ids } = req.body; // Assuming an array of post IDs is sent in the request body
    try {
      // Perform bulk delete
      await deleteEmailTemplate({ id: { [Op.in]: ids } });
      res.status(200).json({ error: false, msg: "Email Templates deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Get variables used in a template by slug
  getTemplateVariables: async (req, res) => {
    try {
      // Retrieve all email templates
      const templates = await getAllEmailTemplates();

      // Initialize an object to store template data grouped by type
      const templateDataByType = {};

      // Iterate through each template
      for (const template of templates) {
        // Extract variables from the template's HTML body
        const variables = extractVariables(template.bodyHtml);

        // Initialize a set to store unique variables for the current template
        const uniqueVariables = new Set(variables);

        // Check if the type already exists in the object
        if (templateDataByType.hasOwnProperty(template.type)) {
          // Merge variables if the type already exists
          uniqueVariables.forEach(variable => {
            templateDataByType[template.type].variables.add(variable);
          });
        } else {
          // Create a new entry if the type doesn't exist
          templateDataByType[template.type] = {
            type: template.type,
            variables: uniqueVariables
          };
        }
      }

      // Convert the object values to an array and convert Set to array for each type
      const templateData = Object.values(templateDataByType).map(entry => ({
        type: entry.type,
        variables: [...entry.variables]
      }));

      // Construct response with array of template data
      res.status(200).json({ error: false, msg: 'Template variables retrieved successfully', data: { rows: templateData } });
    } catch (error) {
      console.error('Error occurred while fetching template variables:', error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

}

module.exports = EmailTemplatesApi;
