const express = require("express")
const mongoose = require("mongoose")

const app =  express() 

app.get("/", function(req,res){
    res.send("hey")
})

app.listen(4000, function(){
    console.log("hey")
})