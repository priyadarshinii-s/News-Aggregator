// require('dotenv').config();


// const express = require("express");
// const cors = require("cors");
// const app = express();
// const mongoose = require("mongoose");



// app.use(cors());

// app.use(express.json());

// app.get("/", (req, res)=>{
//     res.send("hi")
// })

// app.listen(7000, ()=> {
//     console.log("Server is running on port : 7000")
// })










const {generateHash} = require("./hasher");

                                    // ---------------- WILL HANDLE THIS, DO NOT TOUCH THIS ----------------------- //
news_content = `President Donald Trump exempted smartphones, computers, and other tech devices and components from his reciprocal tariffs, new guidance from U.S. Customs and Border Protection shows.
The guidance, issued late Friday evening, comes after Trump earlier this month imposed 145% tariffs on products from China, a move that threatened to take a toll on tech giants like Apple
, which makes iPhones and most of its other products in China.`

console.log(generateHash(news_content))
