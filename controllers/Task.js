const Task = require("../models/Task");

createTask = (req, res) => {
  const { body: newTask } = req;

  if (!newTask) {
    return res.status(400).json({
      success: false,
      error: "You must provide task",
    });
  }

  const task = new Task(newTask);
  if (!task) {
    return res.status(400).json({ success: false, error: err });
  }

  task
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        _id: task._id,
        message: "task created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "task not created!",
      });
    });
};

updateTask = async (req, res) => {
  try {
    const {body: updates} = req;

    if (!updates) {
      return res.status(400).json({
        success: false,
        error: "You must provide a task to update",
      });
    }

    const task = await Task.findOne({ _id: req.params.id });

    // Edit task fields

    const updatedtask = {
       ...task._doc,
        ...updates };

    Task.findOneAndUpdate({ _id: req.params.id }, updatedtask, {
      new: true,
    })
      .then(() => {
        return res.status(200).json({
          success: true,
          id: task._id,
          message: "task updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "task not updated!",
        });
      });
  } catch (err) {
    return res.status(404).json({
      err,
      message: "task not found!",
    });
  }
};

deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id }, (err, task) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!task) {
      return res.status(404).json({ success: false, error: `Task not found` });
    }

    return res.status(200).json({ success: true, task });
  }).catch((err) => console.log(err));
};

getTasks = async (req, res) => {
  await Task.find({}, (err, tasks) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, tasks });
  }).catch((err) => console.log(err));
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
};
