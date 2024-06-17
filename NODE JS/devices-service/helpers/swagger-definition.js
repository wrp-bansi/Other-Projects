const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Nodejs API Project For Mysql',
    version: '1.0.0',
    description: 'Description of your API',
  },
  servers: [
    {
      url: 'http://localhost:8099',
      description: 'Development server',
    },
  ],
};

module.exports = swaggerDefinition;
