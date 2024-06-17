// const nodemailer = require('nodemailer');
// const fs = require('fs');
// const path = require('path');
// const handlebars = require('handlebars');
// const { getSettingValue } = require('../helpers/chche-helper');
// const productService = require('../../../../product-service/src/v1/services/products');
// const moment = require('moment');

// // Function to fetch product name based on product ID
// async function getProductName(productId) {
//   try {
//     // Get the product details
//     const product = await productService.getOneProduct({ productId });

//     // Return the product name
//     return product.productName;
//   } catch (error) {
//     throw new Error(`Error fetching product name for ID ${productId}: ${error.message}`);
//   }
// }

// // Function to create Nodemailer transporter with SMTP configuration
// const createTransporter = async () => {
//   try {
//     const SMTP_HOST = await getSettingValue('SMTP_HOST');
//     const SMTP_USERNAME = await getSettingValue('SMTP_USERNAME');
//     const SMTP_PASSWORD = await getSettingValue('SMTP_PASSWORD');

//     // Create Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       host: SMTP_HOST,
//       port: 2525,
//       secure: false,
//       auth: {
//         user: SMTP_USERNAME,
//         pass: SMTP_PASSWORD
//       }
//     });

//     return transporter;
//   } catch (error) {
//     throw new Error(`Error creating Nodemailer transporter: ${error.message}`);
//   }
// };

// // Function to send email based on template
// async function sendEmail(templateName, userData) {
//   try {
//     // Create Nodemailer transporter
//     const transporter = await createTransporter();

//     // Read email template file
//     const templatePath = path.join(__dirname, '..', '..', '..', '..', 'order-service', 'src', 'v1', 'emailTemplates', templateName + '.html');
//     const templateContent = fs.readFileSync(templatePath, 'utf8');

//     // Compile the template
//     const compiledTemplate = handlebars.compile(templateContent);

//     // Fetch product names asynchronously
//     const productNamesPromises = userData.orderItems.map(async (item) => {
//       const productName = await getProductName(item.productId);
//       return { ...item, productName };
//     });

//     // Format the order date
//     const formattedOrderDate = moment(userData.orderDate).format('YYYY-MM-DD');

//     // Wait for all product name promises to resolve
//     const orderItemsWithData = await Promise.all(productNamesPromises);

//     // Replace placeholders in the template with actual data
//     const emailContent = compiledTemplate({
//       orderId: userData.orderId,
//       orderDate: formattedOrderDate,
//       shippingAddress: userData.shippingAddress,
//       billingAddress: userData.billingAddress,
//       orderAmount: userData.orderAmount,
//       username: userData.username,
//       orderStatus: userData.orderStatus,
//       orderItems: orderItemsWithData
//     });

//     // Send email
//     await transporter.sendMail({
//       from: process.env.EMAIL_ADMIN,
//       to: userData.email,
//       subject: 'Order Status Change Notification',
//       html: emailContent
//     });

//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// }

// module.exports = { sendEmail };


const nodemailer = require('nodemailer');
const { getSettingValue } = require('../helpers/chche-helper');
const { getOneEmailTemplate} = require('../services/emailTemplate');

// Function to create Nodemailer transporter with SMTP configuration
const createTransporter = async () => {
  try {
    const SMTP_HOST = await getSettingValue('SMTP_HOST');
    const SMTP_USERNAME = await getSettingValue('SMTP_USERNAME');
    const SMTP_PASSWORD = await getSettingValue('SMTP_PASSWORD');

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: 2525,
      secure: false,
      auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD
      }
    });

    return transporter;
  } catch (error) {
    throw new Error(`Error creating Nodemailer transporter: ${error.message}`);
  }
};

// Function to send email based on template
async function sendEmail(templateName, userData,subject,fromEmail = process.env.EMAIL_ADMIN, toEmail = userData.email) {
  try {
    // Create Nodemailer transporter
    const transporter = await createTransporter();

    // Retrieve email template content from the database based on the templateName
    const template = await getOneEmailTemplate({ slug: templateName });

    if (!template) {
      throw new Error(`Email template '${templateName}' not found`);
    }

    // Replace placeholders in the template with actual data
    let emailBody = template.bodyHtml;
    for (const [key, value] of Object.entries(userData)) {
      emailBody = emailBody.replace(new RegExp(`{${key}}`, 'g'), value);
    }
    // Send email
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: subject || template.subject,
      html: emailBody
    });

  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = { sendEmail };


