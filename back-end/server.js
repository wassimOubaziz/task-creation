require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");
const port = 4000;

// Connect to MongoDB
const URL = process.env.URL;

mongoose.set("strictQuery", true);
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongo");
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
