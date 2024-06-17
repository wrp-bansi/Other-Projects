
const validationRules = {
  userSingUp: {
    body: {
      firstName: "required|string",
      lastName: "required|string",
      email: "required|email",
      password: "required|string|min:4",
      mobile: 'required|integer|digits:10',
      deviceId: "string",
      deviceName: "string",
      deviceType: "string",
      ip: "string",
      token: "string",
      firebaseToken: "string"
    }
  },
  updateUser: {
    params: {
      userId: "required|integer"
    },
    body: {
      firstName: "string",
      lastName: "string",
      email: "email",
      mobile: 'integer|digits:10',
      password: "string|min:4",
      deviceId: "string",
      deviceName: "string",
      deviceType: "string",
      ip: "string"
    }
  },
  deleteUser: {
    params: {
      userId: "required|integer"
    }
  },
  updateStatus: {
    params: {
      userId: "required|integer"
    },
    body: {
      userStatus: "required|string|in:Active,Banned",
      bannedReason: "string|required_if:userStatus,Banned",
      token: "string"
    }
  },
  bulkDeleteUsers: {
    body: {
      userIds: "required|array",
      "userIds.*": "integer"
    }
  },
  createUserRole: {
    body: {
      name: 'required|string'
    },
  },
  updateUserRole: {
    params: {
      roleId: 'required|integer',
    },
    body: {
      name: 'string'
    },
  },
  deleteUserRole: {
    params: {
      roleId: 'required|integer',
    },
  },
  bulkDeleteUserRoles: {
    body: {
      roleIds: 'required|array',
      'roleIds.*': 'integer',
    },
  },
  createWishlistItem: {
    body: {
      userId: 'required|integer',
      productId: 'required|integer',
      addedDate: 'date',
      notes: 'string',
    },
  },
  updateWishlistItem: {
    params: {
      wishlistId: 'required|integer',
    },
    body: {
      userId: 'integer',
      productId: 'integer',
      addedDate: 'date',
      notes: 'string',
    },
  },
  deleteWishlistItem: {
    params: {
      productId: 'required|integer',
    },
  },
  bulkDeleteWishlistItems: {
    body: {
      wishlistIds: 'required|array',
      'wishlistIds.*': 'integer',
    },
  },
  updateVendorCommission:{
    params: {
      userId: "required|integer"
    },
    body: {
      vendorCommission: "required|numeric|min:0"
    },
  }
};

module.exports = validationRules;
