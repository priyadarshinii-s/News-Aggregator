const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateProfileImage,
  getUserProfile,
} = require("../controllers/UsersControllers.js");
const { verifyToken } = require('../middleware/auth.js');

const auth = require("../middleware/auth.js");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.put("/profile-image/:id", updateProfileImage);
router.get('/:id', verifyToken, getUserProfile);

module.exports = router;
