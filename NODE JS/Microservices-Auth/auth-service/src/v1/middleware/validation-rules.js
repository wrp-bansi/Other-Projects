const validationRules = {
  adminLogin: {
    body: {
      email: "required|string|email",
      password: "required|string",
    },
  },
  userLogin: {
    body: {
      email: "required|string|email",
      password: "required|string",
    },
  },

};

module.exports = validationRules;
