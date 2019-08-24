const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser');
const uuid = require("uuid/v4");

const config = require("./config");
const utils = require("./utils");

const Users = require("./data/User"); // Stub Data

const PORT = config.port || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// User
require("./routes/user")({ app, Users, uuid });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
