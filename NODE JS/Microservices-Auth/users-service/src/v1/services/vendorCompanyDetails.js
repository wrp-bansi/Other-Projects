const Users = require("../models/users");
const VendorCompanyDetails = require("../models/vendorCompanyDetails");

// Get Vendor Company Details with Pagination
async function getVendorCompanyDetailswithpagination(whereParams, otherdata) {
  const data = await VendorCompanyDetails.findAndCountAll({
    where: whereParams,
    ...otherdata,
    include: [{ model: Users, as: 'userDetails' }]
  });

  return data;
}
// Get Vendor Company Details without Pagination
async function getAllVendorCompanyDetails(whereParams) {
  const data = await VendorCompanyDetails.findAll({
    where: whereParams,
    include: [{ model: Users, as: 'userDetails' }] // Include user details association
  });
  return data;
}

// Create Vendor Company Details
async function createVendorCompanyDetails(createParams) {
  const user = await VendorCompanyDetails.create({...createParams});
  return user;
}
// Get single Vendor Company Details
const getSingleVendorCompanyDetails = async (whereParams) => {
  const data = await VendorCompanyDetails.findOne({ where: whereParams });
  return data;
};

// Update Vendor Company Details
async function updateVendorCompanyDetails(updateParams, updateData) {

  const data = await getSingleVendorCompanyDetails(updateParams);
  if(!data){
    throw new Error('Vendor Company Details not found');
  }

  await data.update(updateData);
  return data;
}


module.exports = {createVendorCompanyDetails,updateVendorCompanyDetails,getSingleVendorCompanyDetails,getAllVendorCompanyDetails,getVendorCompanyDetailswithpagination}