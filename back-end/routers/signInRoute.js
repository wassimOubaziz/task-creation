const express = require("express");
const router = express.Router();
const User = require("../modules/User");
const jwt = require("jsonwebtoken");

////signInControler.checkSignIn
router.route("/").post(async (req, res) => {
  try {
    //geting data from client side
    const { email, password } = req.body;

    //checking if email or password are empty
    if (email == "" || password == "") {
      return res
        .status(400)
        .json({ message: "your email or password must not be empty" });
    }
    //checking if the email is valide
    let user = await User.findOne({
      email: email,
    }).select("+password -taskes -userName -email");

    // //check if the email is valid or not
    // if (!user.isValide) {
    //   return res.status(400).json({ message: "This acount is not valide" });
    // }

    //checking if the password is valide
    if (!user || !(await user.checkPassword(password, user.password))) {
      return res
        .status(401)
        .json({ message: "your email or password are invalide plz check!" });
    }

    //creating a web token for the valid user login
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });

    // i dont wont to chow all of this
    user.password = undefined;
    user.isValide = undefined;

    //sending cookie to client side
    res.cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: false,
      // secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });

    // sending to data the response if everything is correct
    res.status(200).json({
      status: "success",
      token,
      user,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
