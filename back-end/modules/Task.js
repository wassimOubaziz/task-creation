const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required to have a task"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    deadLine: {
      type: Date,
      required: [true, "Deadline is required"],
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
  },
  { timestamps: true }
);

//check if dedline is in the future
taskSchema.pre("save", function (next) {
  if (this.deadLine < Date.now()) {
    next(new Error("Deadline must be in the future"));
  } else {
    next();
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
