const express = require("express");
const {
  registerUser,
  loginUser,
  getUserById,
  resetPassword,
  resetPasswordpage,
  Oauthuser,
} = require("../Controllers/user.controller");
const { authMiddleware } = require("../Middleware/auth.middleware");
const { oauthMiddleware } = require("../Middleware/oauth.middleware");

const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/getuser", authMiddleware, getUserById);
router.post("/resetpassword", resetPassword);
router.post("/resetpasswordpage", resetPasswordpage);
router.post("/oauth", oauthMiddleware,Oauthuser)
module.exports = router;
