const EmailTemplate = require("../models/emailTemplate");
const slugify = require('slugify');

//Get All Email Templates with pagination
async function getEmailTemplateswithpagination(whereParams) {
  const data = await EmailTemplate.findAndCountAll(whereParams);

  // If no Email Templates found, throw an error
  if (!data || data.rows.length === 0) {
    return {
      rows: []
    }
  }
  return data;
}

//Get All Email Templates without pagination
async function getAllEmailTemplates(whereParams) {

  const data = await EmailTemplate.findAll({
    where: whereParams
  });
  return data;
}

//Get One Email Template
async function getOneEmailTemplate(whereParams) {
  const data = await EmailTemplate.findOne({ where: whereParams });
  if (!data) throw new Error("Email Template not found");
  return data;
}

//Create Email Template
async function createEmailTemplate(emailTemplateData) {
  const slug = slugify(emailTemplateData.templateName, { lower: true });
  const emailTemplateDataWithSlug = { ...emailTemplateData, slug };

  try {
    const createdEmailTemplate = await EmailTemplate.create(emailTemplateDataWithSlug);
    return createdEmailTemplate;
  } catch (error) {
    throw new Error("Failed to create Email Template: " + error.message);
  }
}

//Update Email Template
async function updateEmailTemplatewithslug(updateParams, EmailTemplateData) {
  // Check if the Email Template exists
  const existingemailtemplate = await getOneEmailTemplate(updateParams);
  if (!existingemailtemplate) {
    throw new Error("Email Template not found");
  }

  // Update Email Template
  const slug = slugify(EmailTemplateData.templateName, { lower: true });
  await existingemailtemplate.update({ ...EmailTemplateData, slug });


  // Return the updated Email Template
  return existingemailtemplate;
}

async function updateEmailTemplate(updateParams,EmailTemplateData) {
  // Check if the Email Template exists
  const existingemailtemplate = await getOneEmailTemplate(updateParams);
  if (!existingemailtemplate) {
    throw new Error("Email Template not found");
  }
  // Email Template exists exists, proceed with the update
  await existingemailtemplate.update(EmailTemplateData);
  // Return the updated Email Template
  return existingemailtemplate;
}

// Delete Email Template
async function deleteEmailTemplate(whereParams) {
  const data = await EmailTemplate.destroy({ where: whereParams })
  if (data === 0) {
    throw new Error("Email Template not found");
  }
  return { msg: "Email Template deleted successfully" };
}

// extract variables from template HTML using Handlebars
const extractVariables = (templateHTML) => {
  const bodyStartIndex = templateHTML.indexOf('<body>');
  const bodyEndIndex = templateHTML.indexOf('</body>');

  // Extract the content within the body section
  const bodyContent = templateHTML.substring(bodyStartIndex + 6, bodyEndIndex);

  const regex = /{([^{}]+)}/g;
  const matches = bodyContent.match(regex);

  if (!matches) {
    return [];
  }

  // Extract the content within curly braces
  const variables = matches.map(match => match.match(/[^{}]+/)[0].trim());

  return Array.from(new Set(variables));
};


module.exports = { getAllEmailTemplates, getOneEmailTemplate, createEmailTemplate, updateEmailTemplate, deleteEmailTemplate, getEmailTemplateswithpagination,updateEmailTemplatewithslug,extractVariables };
