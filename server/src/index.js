const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

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

// defining an endpoint to return all tags
app.use('/api/tag', require('./routers/tag'));
app.use('/api/shop',require('./routers/shop'));
app.use('/api/channel', require('./routers/channel'));

// starting the server
app.listen(3001, () => {
  console.log("Access to API by http://localhost:3001/api");
});
