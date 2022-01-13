const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
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
        url: 'http://localhost:3000/api/',
        description: 'Development server',
      },
    ]
  },
  apis: ["./src/routers/*.js"],
};

module.exports = swaggerJSDoc(options);