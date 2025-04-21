const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/UsersRoutes");
const newsRoutes = require("./routes/NewsRoutes");

const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/Users"); 
const News = require("./models/News"); 

const app = express();
app.use(cors());
app.use(express.json());

// console.log("JWT_SECRET:", process.env.JWT_SECRET);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);



const {generateHash} = require("./hasher");

                                    // ---------------- WILL HANDLE THIS, DO NOT TOUCH THIS ----------------------- //
news_content = `President Donald Trump exempted smartphones, computers, and other tech devices and components from his reciprocal tariffs, new guidance from U.S. Customs and Border Protection shows.
The guidance, issued late Friday evening, comes after Trump earlier this month imposed 145% tariffs on products from China, a move that threatened to take a toll on tech giants like Apple
, which makes iPhones and most of its other products in China.`

console.log(generateHash(news_content))