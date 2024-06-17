// Validation helper
// https://github.com/mikeerickson/validatorjs
// https://blog.logrocket.com/handle-data-validation-node-js-validatorjs/

const Validator = require('validatorjs')
const schemas = require('./validation-rules')
const logger = require('../helpers/logger-helper')

var validation_helper = {
  validate_request: async (body, rules, customErrorMessages = {}) => {
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
        const { body, query, params } = req

        const schema = rules;
        if (!schema) {
          return next()
        }

        // Body Validation
        if (schema.body) {
          const is_valid = await validation_helper.validate_request(
            body,
            schema.body,
          )
          if (is_valid !== true) {
            return res.status(400).json({ error: true, msg: is_valid })
          }
        }

        // Query Validation
        if (schema.query) {
          const is_valid = await validation_helper.validate_request(
            query,
            schema.query,
          )
          if (is_valid !== true) {
            return res.status(400).json({ error: true, msg: is_valid })
          }
        }

        // Params Validation
        if (schema.params) {
          const is_valid = await validation_helper.validate_request(
            params,
            schema.params,
          )
          if (is_valid !== true) {
            return res.status(400).json({ error: true, msg: is_valid })
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

module.exports = validation_helper
