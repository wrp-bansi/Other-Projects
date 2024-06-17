const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDefinition = require("../helpers/swagger-definition");

const options = {
  swaggerDefinition,
  apis: ["./src/v1/routes/*.js"], // Path to the API routes folder Wise
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
