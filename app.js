const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser');

const config = require("./config");
const utils = require("./utils");

const Restaurants = require("./data/Restaurants"); // Stub Data

const PORT = config.port || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// search router
require("./routes/search")({ app, Restaurants });
require("./routes/rating")({ app, Restaurants, utils });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
