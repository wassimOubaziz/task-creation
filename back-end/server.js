require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");
const port = 4000;

// Connect to MongoDB
const BD = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(BD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    })
  )
  .catch((err) => console.log("DB connection failed", err));
