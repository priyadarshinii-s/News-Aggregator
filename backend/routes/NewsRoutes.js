const express = require("express");
const router = express.Router();
const { createNews, getAllNews, getNewsById } = require("../controllers/NewsControllers");
const { verifyToken } = require("../middleware/auth");

router.post("/create", verifyToken, createNews);
router.get("/", getAllNews);
router.get("/:id", getNewsById);

module.exports = router;
