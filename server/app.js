const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const app = express();
app.use(cookieParser())
dotenv.config({ path: "./config.env" });
require(`./db/conn`);

const PORT = process.env.PORT;

app.use(express.json());
app.use(require("./router/auth"));

app.listen(PORT, function () {
  console.log(`running at port ${PORT}`);
});
