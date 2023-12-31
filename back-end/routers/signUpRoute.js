const express = require("express");
const router = express.Router();
const User = require("../modules/User");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

//sign up a user
router.route("/").post(async (req, res) => {
  const body = req.body;

  ////////////////////
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SECRET, // replace with your actual email address
      pass: process.env.PASSWORD_SECRET, // replace with your actual email password
    },
  });

  try {
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res.status(400).json({ message: "this email is already used" });
    }
    let token;
    if (!user) {
      token = jwt.sign({ email: body.email }, process.env.JWT_SECRET);
      await User.create({
        userName: body.userName,
        email: body.email,
        password: body.password,
        validationToken: token,
      });
      ///this will change in deployment
      const validationLink = `${process.env.SERVER_URL}/validate/${token}`;
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_SECRET, // replace with your actual email address
          to: body.email, // replace with the new user's email address
          subject: "Please validate your account",
          text: `Click this link to validate your account: ${validationLink}`,
          html: `<div style="background-color: #f2f2f2; padding: 20px;">
          <h2>Thanks for registering!</h2>
          <p>Please click the button below to validate your account:</p>
          <a href="${validationLink}" style="background-color: #4CAF50; border: none; color: white; padding: 12px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin-top: 20px;">Validate Account</a>
      </div>
      `,
        });
      } catch (e) {
        if (e) await User.deleteOne({ email: body.email });
        return res.status(400).json({ message: e.message });
      }
    }

    res.status(200).json({
      message: "Validation Email succesfully sended plz check your email",
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
