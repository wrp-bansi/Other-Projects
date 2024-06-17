const validationRules = {
  createRequestPayment: {
    body: {
      amount: "required|numeric",
      message: "string"
    }
  },
  updateRequestPayment: {
    params: {
      id: "required|integer"
    },
    body: {
      amount: "numeric",
      message: "string"
    }
  },
  deleteRequestPayment: {
    params: {
      id: "required|integer"
    }
  },
  bulkDeleteRequestPayments: {
    body: {
      ids: "required|array",
      "ids.*": "integer"
    }
  },
  createWalletHistory: {
    body: {
      vendorId: "required|integer",
      amount: "required|numeric",
      orderId: "integer",
      type: "string",
      previousAmount: "numeric",
      currentAmount: "numeric"
    }
  },
  deleteWalletHistory: {
    params: {
      id: "required|integer"
    }
  },
  bulkDeleteWalletHistories: {
    body: {
      ids: "required|array",
      "ids.*": "integer"
    }
  }
};

module.exports = validationRules;
