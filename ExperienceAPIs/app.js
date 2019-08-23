const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser');
const uuid = require("uuid/v4");

const config = require("./config");
const utils = require("./utils");

const Restaurants = require("./data/Restaurants"); // Stub Data
const User = require("./data/User"); // Stub Data

const PORT = config.port || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Restaurants
require("./routes/restaurant")({ app, Restaurants, utils });
require("./routes/user")({ app, User, uuid, utils });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
