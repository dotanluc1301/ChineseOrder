const swaggerAutogen = require('swagger-autogen')()

swaggerAutogen('./swagger-output.json', ['./src/routers/*.js']);