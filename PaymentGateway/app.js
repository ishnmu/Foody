const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser');
const uuid = require("uuid/v4");

const config = require("./config");
const utils = require("./utils");

const Transactions = require("./data/Transactions"); // Stub Data

const PORT = config.port || 3030;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Transactions
require("./routes/transaction")({ app, Transactions });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
