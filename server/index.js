const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// enabling CORS for all requests
app.use(cors({ origin: true}));

// adding morgan to log HTTP requests
//app.use(morgan('combined'));

app.use('/api/tag', require('./src/routers/tag'));
app.use('/api/shop',require('./src/routers/shop'));
app.use('/api/channel', require('./src/routers/channel'));
app.use('/',swaggerUi.serve,
            swaggerUi.setup(require('./src/routers/swagger-doc'),{ explorer:true }));

// starting the server
app.listen(process.env.PORT || 3000, () => {
  console.log("Access to API by http://localhost:3000");
});
