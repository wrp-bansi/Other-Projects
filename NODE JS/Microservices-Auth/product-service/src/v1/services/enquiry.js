const Enquiry = require('../models/enquiry');


// Get enquiries with Pagination
async function getEnquiryWithPagination(whereParams, otherdata) {
  const data = await Enquiry.findAndCountAll({
    where: whereParams,
    ...otherdata,
  });

  // If no Enquiry found, return an empty result
  if (!data || data.rows.length === 0) {
    return { count: 0, rows: [] };
  }

  return data;
}

// Get All enquiries without Pagination
async function getAllEnquiry(whereParams) {
  const data = await Enquiry.findAll(whereParams);
  return data;
}

// Create a new enquiry
async function createEnquiry(enquiryData) {
  const newenquiry = await Enquiry.create(enquiryData);
  if (newenquiry) {
    return newenquiry;
  }
  throw new Error('Failed to create enquiry');
}

module.exports = {createEnquiry,getEnquiryWithPagination,getAllEnquiry};
