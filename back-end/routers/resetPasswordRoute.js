// const express = require("express");
// const nodemailer = require("nodemailer");
// const router = express.Router();
// const User = require("../modules/User");
// const { route } = require("./signInRoute");

// //reset password route when you forget your password send email to reset it

// router.route("/").post(async (req, res) => {
//     const { email } = req.body;
//     try {
//         const user = await User.findOne({ email: email });
//         if (!user) {
//             return res.status(400).json({ message: "This email is not exist" });
//         }
//         //creating a web token for the valid user login
//         const token = user.createResetPasswordToken();
//         await user.save({ validateBeforeSave: false });

//         //sending email to the user
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.EMAIL_PASSWORD,
//             },
//         });

//         const mailOptions = {
//             from: process.env.EMAIL,
//             to: email,
//             subject: "Reset your password",
//             text: `Reset your password by clicking on this link ${process.env.SERVER_URL}/resetPassword/${token}`,
//         };

//         transporter.sendMail(mailOptions, (err, info) => {
//             if (err) {
//                 return res.status(400).json({ message: err.message });
//             }
//             res.status(200).json({
//                 message: "Reset password email successfully sended plz check your email",
//             });
//         }
//         );
//     } catch (e) {
//         res.status(400).json({ message: e.message });
//     }
// });

// router.route("/resetPassword/:token").patch(async (req, res) => {
//     const { token } = req.params;
//     const { password } = req.body;
//     try {

// module.exports = router;
