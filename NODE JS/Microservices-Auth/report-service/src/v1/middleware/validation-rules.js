const validationRules = {
  getProductsByCreationDate: {
    query: {
      startDate: "required|date", // Assuming startDate and endDate are in the query parameters
      endDate: "required|date",
      orderBy: "string", // Assuming these parameters are optional
      order: "string",
      isDownload: "boolean",
    },
  },
  getProductsByStatus: {
    query: {
      status: "required|string|in:active,inactive", // Assuming status is in the query parameters
      orderBy: "string", // Assuming these parameters are optional
      order: "string",
      isDownload: "boolean",
    },
  },
  getProductsByQuantityRange: {
    query: {
      orderBy: "string",
      order: "string",
      isDownload: "boolean",
    },
  },
  getUsersByRegisterDate: {
    query: {
      startDate: "required|date",
      endDate: "required|date",
      orderBy: "string",
      order: "string",
      isDownload: "boolean",
    },
  },
  getUsersByStatus: {
    query: {
      status: "required|string|in:active,banned",
      orderBy: "string",
      order: "string",
      isDownload: "boolean",
    },
  },
  getOrdersByDate: {
    query: {
      startDate: "required|date",
      endDate: "required|date",
      orderBy: "string",
      order: "string",
      isDownload: "boolean",
    },
  },
  getOrdersByStatus: {
    query: {
      status: "required|string|in:Pending,Processing,Shipped,Delivered,Cancelled",
      orderBy: "string",
      order: "string",
      isDownload: "boolean",
    },
  },
  getOrderAmountReportByRange: {
    query: {
      minAmount: "required|numeric",
      maxAmount: "required|numeric",
      orderBy: "string",
      order: "string",
      isDownload: "boolean",
    },
  },
};

module.exports = validationRules;
