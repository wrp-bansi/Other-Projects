const validationRules = {
  createTransaction: {
    body: {
      amount: "required|numeric",
      orderId: "required|string",
      customerId: "required|string",
      paymentGatewayId: "required|string"
    }
  },
  createCurrency: {
    body: {
      currencyCode: 'required|string',
      currencyName: 'required|string',
      symbol: 'required|string',
      country: 'required|string',
      exchangeRate: 'required|numeric|min:0',
      decimalPlaces: 'integer|min:0',
    }
  },
  updateCurrency: {
    params: {
      currencyId: 'required|integer'
    },
    body: {
      currencyCode: 'string',
      currencyName: 'string',
      symbol: 'string',
      country: 'string',
      exchangeRate: 'numeric|min:0',
      decimalPlaces: 'integer|min:0',
    }
  },
  deleteCurrency: {
    params: {
      currencyId: 'required|integer'
    }
  },
  bulkDeleteCurrency: {
    body: {
      currencyIds: 'required|array',
      'currencyIds.*': 'integer',
    }
  },
};

module.exports = validationRules;
