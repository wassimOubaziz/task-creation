const express = require("express");

const router = express.Router();
const User = require("../modules/User");

/******************************************* User Router ******************************************** */

//add user route /user
router.route("/").post(async (req, res, next) => {
  try {
    const body = req.body;
    const user = await User.create({
      userName: body.userName,
      password: body.password,
      email: body.email,
    });
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: { user },
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
