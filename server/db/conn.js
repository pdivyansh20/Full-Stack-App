const mongoose = require("mongoose")
const DB = process.env.DATABASE
mongoose.connect(DB).then(function()
{console.log("running")})