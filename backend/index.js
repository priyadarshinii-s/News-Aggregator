require('dotenv').config();


const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("hi")
})

app.listen(7000, ()=> {
    console.log("Server is running on port : 7000")
})