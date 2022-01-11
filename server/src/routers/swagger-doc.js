const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Chinese order routes',
    version: '1.0.0',
    description: 'This is an api document in which places the detail of all service(s)',
    contact: {
      name: 'GIT repository',
      url: 'https://github.com/dotanluc1301/ChineseOrder',
      email: 'dotanluc@gmail.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:5050/api/',
      description: 'Development server',
    },
  ]
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./*.js'],
};

module.exports = swaggerJSDoc(options);