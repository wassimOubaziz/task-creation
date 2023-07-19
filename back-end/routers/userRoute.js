const express = require("express");

const router = express.Router();
const nodeMailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../modules/User");

/******************************************* User Router ******************************************** */

//add user route /user
router.route("/").post(async (req, res) => {
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

router.route("/profile").get(async (req, res) => {
  try {
    res
      .status(200)
      .json({ userName: req.user.userName, email: req.user.email });
  } catch (error) {
    res.status(401).json({ status: "faild", message: error.message });
  }
});

router.route("/profile").put(async (req, res) => {
  try {
    let { userName, password } = req.body;

    if (userName == "" && password == "") {
      return res
        .status(400)
        .json({ message: "userName or password must not be empty" });
    }

    if (userName == "") {
      userName = req.user.userName;
    }

    if (password == "") {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { userName },
        { new: true }
      );
      return res.status(200).json({ status: "success", data: { user } });
    }

    const oldUser = await User.findById(req.user._id);

    const newUser = new User({
      userName,
      password,
      email: oldUser.email,
      isValide: oldUser.isValide,
      taskes: oldUser.taskes,
      validationToken: oldUser.validationToken,
      createdAt: oldUser.createdAt,
      updatedAt: oldUser.updatedAt,
      changedPassword: oldUser.changedPassword,
      _id: oldUser._id,
    });

    await User.deleteOne({ _id: req.user._id });
    console.log("hello");
    await newUser.save();

    res.status(200).json({ status: "success", data: { newUser } });
  } catch (error) {
    res.status(401).json({ status: "faild", message: error.message });
  }
});

module.exports = router;
