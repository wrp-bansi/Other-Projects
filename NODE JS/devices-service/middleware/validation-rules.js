const validation_rules = {
  adminSignup: {
    body: {
      firstName: "required|string",
      lastName: "required|string",
      email: "required|string",
      mobile: "required|integer|digits:10",
      password: "required|string",
    },
  },
  adminLogin: {
    body: {
      email: "required|string|email",
      password: "required|string|min:4",
    },
  },
  mpin_login: {
    body: {
      mpin: "required|integer|digits:4",
      ip: "required|string",
      mac_address: "required|string",
      mobile: "required|integer|digits:10",
    },
    headers: {
      device_id: "required|string",
    },
  },
  set_mpin: {
    body: {
      token: "required|string",
      mpin: "required|integer|digits:4",
      device_name: "required|string",
      device_type: "required|integer|in:0,1",
      firebase_token: "required|string",
    },
    headers: {
      device_id: "required|string",
    },
  },
  user_register: {
    body: {
      full_name: "required|string|min:4",
      city: "required|string",
      state: "required|string",
      ip: "required|string",
      lang: "required|string",
      token: "required|string",
    },
    headers: {
      device_id: "required|string",
    },
  },
  send_otp: {
    body: {
      mobile: "required|integer|digits:10",
    },
    headers: {
      device_id: "required|string",
    },
  },
  admin_send_otp: {
    body: {
      mobile: "required|integer|digits:10",
    },
    headers: {
      device_id: "required|string",
    },
  },
  verify_otp: {
    body: {
      otp: "required|integer|digits:4",
      mobile: "required|integer|digits:10",
    },
    headers: {
      device_id: "required|string",
    },
  },
  get_cities: {
    params: {
      state_id: "required|integer",
    },
  },
};

module.exports = validation_rules;
