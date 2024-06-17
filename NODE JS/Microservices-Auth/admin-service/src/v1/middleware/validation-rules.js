const validationRules = {
  adminSignup: {
    body: {
      firstName: 'required|string',
      lastName: 'required|string',
      email: 'required|string',
      mobile: 'required|integer|digits:10',
      password: "required|string|min:4",
      role:'required|string',
    },
  },
  updateAdmin: {
    params: {
      adminId: 'required|integer',
    },
    body: {
      firstName: 'string',
      lastName: 'string',
      email: 'string',
      mobile: 'integer|digits:10',
      password: "string|min:4",
      role:'required|string',
    },
  },
  deleteAdmin: {
    params: {
      adminId: 'required|integer',
    },
  },
  updateAdminStatus: {
    params: {
      adminId: 'required|integer',
    },
    body :{
      accountStatus: "required|string|in:Active,Banned"
    }
  },
  bulkDeleteAdmins: {
    body: {
      adminIds: 'required|array',
      'adminIds.*': 'integer',
    },
  },
  createPermission: {
    body: {
      name: 'required|string',
      parent:'integer'
    },
  },
  updatePermission: {
    params: {
      permissionId: 'required|integer',
    },
    body: {
      name: 'string',
      parent:'integer'
    },
  },
  deletePermission: {
    params: {
      permissionId: 'required|integer',
    },
  },
  bulkDeletePermissions: {
    body: {
      permissionIds: 'required|array',
      'permissionIds.*': 'integer',
    },
  },
  createRole: {
    body: {
      name: 'required|string',
      permission:'array'
    },
  },
  updateRole: {
    params: {
      roleId: 'required|integer',
    },
    body: {
      name: 'string',
      permission:'array'
    },
  },
  deleteRole: {
    params: {
      roleId: 'required|integer',
    },
  },
  bulkDeleteRoles: {
    body: {
      roleIds: 'required|array',
      'roleIds.*': 'integer',
    },
  },
};

module.exports = validationRules;
