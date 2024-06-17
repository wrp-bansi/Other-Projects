// Validation helper
// https://github.com/mikeerickson/validatorjs
// https://blog.logrocket.com/handle-data-validation-node-js-validatorjs/

const Validator = require('validatorjs')
const logger = require('../helpers/logger-helper')

const validationHelper = {
  validateRequest: async (body, rules, customErrorMessages = {}) => {
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
      return validator.errors.all()
    }
  },

  validate: (rules) => {
    return async (req, res, next) => {
      try {
        const {body, query, params} = req

        const schema = rules;
        if (!schema) {
          return next()
        }

        // Body Validation
        if (schema.body) {
          const isValid = await validationHelper.validateRequest(
            body,
            schema.body,
          )
          if (isValid !== true) {
            return res.status(400).json({error: true, msg: isValid})
          }
        }

        // Query Validation
        if (schema.query) {
          const isValid = await validationHelper.validateRequest(
            query,
            schema.query,
          )
          if (isValid !== true) {
            return res.status(400).json({error: true, msg: isValid})
          }
        }

        // Params Validation
        if (schema.params) {
          const isValid = await validationHelper.validateRequest(
            params,
            schema.params,
          )
          if (isValid !== true) {
            return res.status(400).json({error: true, msg: isValid})
          }
        }
        next()
      } catch (error) {
        logger.error(error)
        return res.status(400).json({
          error: true,
          msg: 'An error occurred during validation: ' + error.message,
        })
      }
    }
  },
}

module.exports = validationHelper
