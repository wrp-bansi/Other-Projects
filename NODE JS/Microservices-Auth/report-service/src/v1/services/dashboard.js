const { getSettingValue } = require('../../../../order-service/src/v1/helpers/chche-helper');
const { getAllOrderItems } = require('../../../../order-service/src/v1/services/orderItem');
const { getAllProducts } = require('../../../../product-service/src/v1/services/products');
const { getAllWalletHistory } = require('../../../../revenew-service/src/v1/services/walletHistory');
const { getAllVendorCompanyDetails } = require('../../../../users-service/src/v1/services/VendorCompanyDetails');
const Dashboard = require('../models/dashboard');


async function updateDashboardCount(count, fieldName) {
  try {
    const updateData = {};
    updateData[fieldName] = count;
    await Dashboard.update(updateData, {where: {dashboardId: 1}});
  } catch (error) {
    throw new Error('Error updating dashboard count: ' + error.message);
  }
}

// Function to format date in "YYYY-MM-DD" format
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Calculate total admin revenue
const calculateTotalAdminRevenue = async () => {
  try {
    // Retrieve all vendors
    const vendors = await getAllVendorCompanyDetails();

    // Initialize total admin revenue
    let totalAdminRevenue = 0;

    // Iterate through each vendor
    for (const vendor of vendors) {
      const vendorId = vendor.userId;

      // Get commission rate for the vendor
      let commissionRate = vendor.vendorCommission;

      // If the commission rate is 0, fetch the default commission rate from the settings table
      if (commissionRate === 0) {
        // Fetch default commission rate from settings table
        commissionRate = await getSettingValue('commission_percentage');
      }

      // Get all products belonging to the vendor
      const products = await getAllProducts({ where: { ownerId: vendorId } });

      let totalSales = 0;

      // Iterate through each product
      for (const product of products) {
        // Get order items for the product
        const orderItems = await getAllOrderItems({ where: { productId: product.productId} });

        // Calculate total sales for the product
        const productTotalSales = orderItems.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);

        // Add product's total sales to overall total sales
        totalSales += productTotalSales;
      }

      // Get wallet history for the vendor
      await getAllWalletHistory({ vendorId, type: "Debit", status: "Completed" });

      // Get commission amount for the vendor
      const commission = totalSales * (commissionRate / 100);

      // Add commission amount to total admin revenue
      totalAdminRevenue += commission;
    }

    return totalAdminRevenue;
  } catch (error) {
    console.error('Error calculating total admin revenue:', error);
    throw error;
  }
};

module.exports = {updateDashboardCount, formatDate,calculateTotalAdminRevenue};
