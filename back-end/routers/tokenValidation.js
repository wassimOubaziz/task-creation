const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  try {
    res.status(200).json({ status: "success", message: "token is valid" });
  } catch (error) {
    res.status(401).json({ status: "faild", message: error.message });
  }
});

module.exports = router;
