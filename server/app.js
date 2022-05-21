const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

dotenv.config({ path: "./config.env" });
require(`./db/conn`);

const PORT = process.env.PORT;

// function middleware( req,res,next) {
//     console.log("hello friend")
// }
app.use(express.json());
app.use(require("./router/auth"));

// app.get("/", function(req,res){
//     res.send("home")
// })

// app.get("/about", middleware , function(req,res){
//     res.send("about")
// })

// app.get("/signin", function(req,res){
//     res.send("signin")
// })

// app.get("/signup", function(req,res){
//     res.send("signup")
// })

// app.get("/contact", function(req,res){
//     res.send("contact")
// })

app.listen(PORT, function () {
  console.log(`running at port ${PORT}`);
});
