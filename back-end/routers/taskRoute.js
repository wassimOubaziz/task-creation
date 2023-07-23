const express = require("express");
const router = express.Router();

const Task = require("../modules/Task");
const User = require("../modules/User");

/******************************************* Task Router ******************************************** */

//add task
router.route("/").post(async (req, res) => {
  try {
    const body = req.body;
    const task = await Task.create({
      title: body.title,
      description: body.description,
      deadLine: body.deadLine,
      creator: req.user._id,
    });

    res.status(201).json({
      status: "success",
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//get all tasks for the auhtorized user
router.route("/").get(async (req, res) => {
  try {
    const tasks = await Task.find({ creator: req.user._id });
    res.status(200).json({ status: "success", tasks });
  } catch (error) {
    res.status(401).json({ status: "faild", message: error.message });
  }
});

//delete task by id
router.route("/:id").delete(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task.creator.toString() == req.user._id.toString()) {
      await Task.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ status: "success", message: "task deleted successfully" });
    } else {
      res.status(401).json({
        status: "faild",
        message: "you are not authorized to delete this task",
      });
    }
  } catch (error) {
    res.status(401).json({ status: "faild", message: error.message });
  }
});

//get task by id
router.route("/:id").get(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (req.user._id.toString() !== task.creator.toString()) {
      return res.status(401).json({
        status: "faild",
        message: "you are not authorized to get this task",
      });
    }
    res.status(200).json({ status: "success", task });
  } catch (error) {
    res.status(401).json({ status: "faild", message: error.message });
  }
});

//update task by id
router.route("/:id").put(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (req.user._id.toString() !== task.creator.toString()) {
      return res.status(401).json({
        status: "faild",
        message: "you are not authorized to update this task",
      });
    }
    const { title, description, deadLine, status } = req.body;
    await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, deadLine, status },
      { new: true }
    );
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(401).json({ status: "faild", message: error.message });
  }
});

module.exports = router;
