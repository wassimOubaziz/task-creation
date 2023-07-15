const cron = require("cron");
const User = require("./modules/User");

//the job will run every 10 minutes (can take 20 minutes max),
//to make it 1 minutes (2 minutes max) change the stars and everything to *****
const job = new cron.CronJob("*/1 * * * *", async () => {
  // Find expired users
  const expiredUsers = await User.find({
    isValide: false,
    createdAt: { $lt: new Date(Date.now() - 1 * 60 * 1000) },
  });

  // Delete expired users
  for (const user of expiredUsers) {
    await User.deleteOne({ _id: user._id });
  }
});

module.exports = job;
