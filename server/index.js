const express = require('express')
require("dotenv").config()
var cors = require('cors')
const { port } = require('./src/config/config');
const customers = require('./src/routes/customers');
const mongoConnection = require('./src/config/mongodb-connect')
const app = express();
app.use(express.json())
app.use(cors({ origin: '*' }))

customers(app)

app.listen(port || 2000, async function () {
  await mongoConnection();

  console.log("listening on port ", port);
});