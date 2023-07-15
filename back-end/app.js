const express = require("express");
const bodyParser = require("body-parser");
const job = require("./cron-not-valide-emails");
const { protect, permition } = require("./controlers/auth");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routers

//signIn route
const signInRouter = require("./routers/signInRoute");
app.use("/signin", signInRouter);

//signOut route
const signOutRouter = require("./routers/signOutRoute");
app.use("/signout", signOutRouter);

//signUp route
const signUpRouter = require("./routers/signUpRoute");
app.use("/signup", signUpRouter);

//validate route
const validateRouter = require("./routers/validateRoute");
app.use("/validate", validateRouter);

//User route
const userRouter = require("./routers/userRoute");
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

//run job to delete not valide emails
job.start();

//exporting app
module.exports = app;
