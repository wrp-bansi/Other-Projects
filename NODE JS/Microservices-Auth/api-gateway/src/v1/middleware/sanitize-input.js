const sanitizeHtml = require('sanitize-html');
const logger = require("../helper/logger-helper");

// Define a very strict configuration that removes all HTML tags
const strictHtmlSanitizeConfig = {
  // Disallow all HTML tags
  allowedTags: [],
  // Disallow all HTML attributes
  allowedAttributes: {},
  // Disallow all URL schemes
  allowedSchemes: [],
  // Disallow all HTML comments
  allowedComments: false,
};

// Define your middleware function
function sanitizeInput(req, res, next) {
  try {
    if (req.body) {
      // Apply the strict HTML sanitization configuration to the entire request body
      req.body = recursivelySanitize(req.body, strictHtmlSanitizeConfig);
    }

    if (req.params) {
      // Recursively sanitize the request params
      req.params = recursivelySanitize(req.params, strictHtmlSanitizeConfig);
    }

    if (req.query) {
      // Recursively sanitize the request query
      req.query = recursivelySanitize(req.query, strictHtmlSanitizeConfig);
    }
    next();
  } catch (e) {
    logger.error('Sanitization error:', e);
    return res.status(403).send({
      error: true,
      msg: "Something went wrong during input sanitization."
    });
  }
}

function recursivelySanitize(data, config) {
  if (Array.isArray(data)) {
    return data.map(element => recursivelySanitize(element, config));
  } else if (typeof data === 'object' && data !== null) {
    const sanitizedObject = {};
    for (const key in data) {
      sanitizedObject[key] = recursivelySanitize(data[key], config);
    }
    return sanitizedObject;
  } else if (typeof data === 'string') {
    // Sanitize the string using the provided configuration
    return sanitizeHtml(data, config);
  } else {
    return data;
  }
}

module.exports = sanitizeInput;