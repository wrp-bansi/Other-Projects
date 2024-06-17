const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API Documentation',
        version: '1.0.0',
        description: 'API Documentation for your project',
      },
      servers:[
        {
          url:  'http://localhost:8000'
        }
      ],
      components: {
        securitySchemes: {
          JWTAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Enter your JWT token in the format "Bearer <token>"',
          },
        },
      },
    },
    apis: ['routes/*'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
