const validationRules = {
  addOrder: {
    body: {
      customerId: "required|integer",
      billingDetails: "required",
      "billingDetails.billingName": "required|string",
      "billingDetails.billingAddress": "required|string",
      "billingDetails.billingEmail": "required|email",
      "billingDetails.billingMobileNumber": "required|string",
      shippingDetails: "required",
      "shippingDetails.shippingName": "required|string",
      "shippingDetails.shippingAddress": "required|string",
      "shippingDetails.shippingEmail": "required|email",
      "shippingDetails.shippingMobileNumber": "required|string",
      orderItems: "required|array",
      "orderItems.*.productId": "required|integer",
      "orderItems.*.quantity": "required|integer|min:1",
    }
  },
  updateOrder: {
    params: {
      orderId: "required|integer"
    },
    body: {
      customerId: "integer",
      "billingDetails.billingName": "string",
      "billingDetails.billingAddress": "string",
      "billingDetails.billingEmail": "email",
      "billingDetails.billingMobileNumber": "string",
      "shippingDetails.shippingName": "string",
      "shippingDetails.shippingAddress": "string",
      "shippingDetails.shippingEmail": "email",
      "shippingDetails.shippingMobileNumber": "string",
      orderItems: "array",
      "orderItems.*.productId": "integer",
      "orderItems.*.quantity": "integer|min:1",
    }
  },
  updateOrderStatus: {
    params: {
      orderId: "required|integer"
    },
    body: {
      orderStatus: "required|string",
      email: "required|email",
      username: "required|string",
    }
  },
  deleteOrder: {
    params: {
      orderId: "required|integer"
    }
  },
  bulkDeleteOrders: {
    body: {
      orderIds: "required|array",
      "orderIds.*": "integer"
    }
  },
  createCoupon:{
    body: {
      couponCode: "required|string",
      // eslint-disable-next-line no-useless-escape
      discountAmount: ["required", "regex:/^[0-9]+(\.[0-9]+)?$/"],
      expiryDate: "required|date",
      isActive: "boolean",
      usageCount: "required|integer|min:0",
      description: "string"
    }
  },
  updateCoupon: {
    params: {
      couponId: "required|integer"
    },
    body: {
      couponCode: "string",
      // eslint-disable-next-line no-useless-escape
      discountAmount: ["regex:/^[0-9]+(\.[0-9]+)?$/"],
      expiryDate: "date",
      isActive: "boolean",
      usageCount: "integer|min:0",
      description: "string"
    }
  },
  deleteCoupon: {
    params: {
      couponId: "required|integer"
    }
  },
  updateCouponStatus: {
    params: {
      couponId: "required|integer"
    },
    body: {
      isActive: "boolean"
    }
  },
  bulkDeleteCoupons: {
    body: {
      couponIds: "required|array",
      "couponIds.*": "integer"
    }
  },
};

module.exports = validationRules;
