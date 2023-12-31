const express = require("express");
const User = require("../modules/User");
const router = express.Router();

router.route("/:token").get(async (req, res) => {
  const token = req.params.token;
  try {
    const user = await User.findOne({ validationToken: token });

    if (!user) {
      // If the token is invalid, send a 404 error
      return res
        .status(400)
        .redirect(
          `${process.env.CLIENT_URL}/sign-up/The%20Link%20is%20not%20available%20any%20more,%20Plz%20Regester%20again!`
        );
    }

    // Update the user's account to mark it as validated
    user.isValide = true;
    user.validationToken = undefined;
    await user.save();
    res
      .status(200)
      .redirect(
        `${process.env.CLIENT_URL}/sign-in/You%20registered%20succesfully`
      );
  } catch (e) {
    res.status(404).json({ status: "faild", message: e.message });
  }
});

module.exports = router;
