const express = require("express");
const bodyParser = require("body-parser");
const job = require("./cron-not-valide-emails");
const { protect, permition } = require("./controlers/auth");
const cors = require("cors");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors
app.use(
  cors({
    origin: ["http://localhost:3000", "www.localhost:3000", "localhost:3000"],
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
  })
);

//routers

//signIn route
const signInRouter = require("./routers/signInRoute");
app.use("/signin", signInRouter);

//signOut route
const signOutRouter = require("./routers/signOutRoute");
app.use("/signout", protect, signOutRouter);

//signUp route
const signUpRouter = require("./routers/signUpRoute");
app.use("/signup", signUpRouter);

//validate route
const validateRouter = require("./routers/validateRoute");
app.use("/validate", validateRouter);

//User route
const userRouter = require("./routers/userRoute");
app.use("/user", protect, userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

//chekc token validation
const token = require("./routers/tokenValidation");
app.use("/token", protect, token);

//run job to delete not valide emails
job.start();

//exporting app
module.exports = app;
