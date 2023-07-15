const express = require("express");
const router = express.Router();
const User = require("../modules/User");

//making sign out route jwt
router.route("/").get(async (req, res) => {
  res.clearCookie("jwt", { maxAge: 0 });
  res.status(200).json({
    status: "success",
    message: "sign out successfully",
  });
});

module.exports = router;
