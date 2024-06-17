const { createEnquiry, getEnquiryWithPagination, getAllEnquiry } = require('../services/enquiry');
const { getOneEmailTemplate } = require("../../../../communication-service/src/v1/services/emailTemplate");
const { getOneProduct } = require('../services/products');
const { getOneUser } = require('../../../../users-service/src/v1/services/users');
const {Op} = require("sequelize");
const Product = require('../models/product');

const enquiriesApi = {

  // Get All Products enquiry with Pagination vendor
  viewAllProductsEnquiriesWithPagination: async (req, res) => {
    try {
      const { orderBy = "enquiryId", order = "DESC", search = "", filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);
      const ownerId = req.user.userId;

      const whereClause = {
        ...filter,
        [Op.or]: {
          subject: { [Op.like]: `%${search}%` },
          message: { [Op.like]: `%${search}%` },
          enquirerName: { [Op.like]: `%${search}%` },
          enquirerEmail: { [Op.like]: `%${search}%` },
          status: { [Op.like]: `%${search}%` },
        },
      };
      // Include Product model to filter by ownerId
      const include = [{
        model: Product,
        as: 'product',
        where: { ownerId },
        attributes: ["productName"]
      }];

      // Get Posts with pagination and apply filter
      const data = await getEnquiryWithPagination(whereClause,{
        offset,
        limit: perPage,
        order: [[orderBy, order]],
        include
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allEnquiries = await getAllEnquiry({where: whereClause,include});
        responseData = { error: false, msg: "Show All Enquiries", data: { rows: allEnquiries } };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All Enquiries with Pagination",
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
      console.error("Error occurred while fetching Enquiries:", error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Get All Products enquiry with Pagination Admin
  getAllProductsEnquiriesWithPagination: async (req, res) => {
    try {
      const { orderBy = "enquiryId", order = "DESC", search = "", filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      const whereClause = {
        ...filter,
        [Op.or]: {
          subject: { [Op.like]: `%${search}%` },
          message: { [Op.like]: `%${search}%` },
          enquirerName: { [Op.like]: `%${search}%` },
          enquirerEmail: { [Op.like]: `%${search}%` },
          status: { [Op.like]: `%${search}%` },
        },
      };
      // Include Product model to retrieve productName
      const include = [{
        model: Product,
        as: 'product',
        attributes: ['productName'] // Select only productName attribute
      }];
      // Get Posts with pagination and apply filter
      const data = await getEnquiryWithPagination(whereClause,{
        offset,
        limit: perPage,
        order: [[orderBy, order]],
        include
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allEnquiries = await getAllEnquiry({where: whereClause,include});
        responseData = { error: false, msg: "Show All Enquiries", data: { rows: allEnquiries } };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All Enquiries with Pagination",
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

  // Create Enquiry
  createEnquiry: async (req, res) => {
    const { productId, subject, enquirerName, enquirerEmail, message } = req.body;
    const userId = req.user.userId;
    const enquiryDate = new Date().toLocaleDateString();
    const enquiryData = { productId,userId, subject, enquirerName, enquirerEmail, message,enquiryDate};

    try {
      await createEnquiry(enquiryData);

      // Fetch the product to get the ownerId (vendorId)
      const product = await getOneProduct({ productId });
      enquiryData.productName = product.name;

      // Fetch the vendor's email
      const vendor = await getOneUser({ userId: product.ownerId });

      const vendorEmail = vendor.email;

      // Replace placeholders in the email template
      const emailTemplate = await getOneEmailTemplate({ slug: 'product-enquiry-template' });

      // Replace placeholders in the email template
      let replacedTemplate = emailTemplate.bodyHtml;
      replacedTemplate = replacedTemplate.replace(/{productName}/g, product.productName);
      replacedTemplate = replacedTemplate.replace(/{productId}/g, productId);
      replacedTemplate = replacedTemplate.replace(/{enquiryDate}/g, enquiryDate);
      replacedTemplate = replacedTemplate.replace(/{enquirerName}/g, enquirerName);
      replacedTemplate = replacedTemplate.replace(/{enquirerEmail}/g, enquirerEmail);
      replacedTemplate = replacedTemplate.replace(/{message}/g, message);
      console.log('Replaced Template:', replacedTemplate);

      const method = 'POST';
      const sendemailurl=process.env.SEND_EMAIL_URL;
      const headers = { 'Content-Type': 'application/json' };
      // Send email to the admin
      const emailApiResponse = await global.common.callMicroServiceApi(method,sendemailurl, {
        templateName: 'product-enquiry-template',
        fromEmail:enquirerEmail ,
        toEmail:process.env.EMAIL_ADMIN,
        userData: enquiryData,
        emailBody: replacedTemplate
      }, headers);
      if (emailApiResponse.error) {
        throw new Error('Error from send email:', emailApiResponse.msg);
      }

      // Send email to the vendor
      const vendorEmailApiResponse = await global.common.callMicroServiceApi(method, sendemailurl, {
        templateName: 'product-enquiry-template',
        fromEmail: enquirerEmail, // Assuming you want to use enquirerEmail as the from email
        toEmail: vendorEmail,
        userData: enquiryData,
        emailBody: replacedTemplate
      }, headers);
      if (vendorEmailApiResponse.error) {
        throw new Error('Error from sending email to vendor:', vendorEmailApiResponse.msg);
      }

      res.status(200).json({ error: false, msg: "Contact created successfully"});
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

};

module.exports = enquiriesApi;
