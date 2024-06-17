// Validation helper
// https://github.com/mikeerickson/validatorjs
// https://blog.logrocket.com/handle-data-validation-node-js-validatorjs/

const Validator = require('validatorjs')
var requestValidator = {
  validate: async (body, rules, customErrorMessages = {}) => {
    Validator.register(
      'time12hr',
      function (value, requirement, attribute) {
        const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i
        return timeRegex.test(value)
      },
      'The :attribute must be a valid time in 12-hour format with AM/PM.',
    )

    Validator.register(
      'ymd_format',
      function (value, requirement, attribute) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/
        return dateRegex.test(value)
      },
      'The :attribute must be in YMD (YYYY-MM-DD) format.',
    )

    const validator = new Validator(body, rules, customErrorMessages)
    if (validator.passes()) {
      return true
    } else {
      console.log('Validation failed.')
      return validator.errors.all()
    }
  },
}

module.exports = requestValidator
