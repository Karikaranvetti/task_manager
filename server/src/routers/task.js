const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    await req.user.populate("tasks").execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

 

router.get("/tasks/complete/:id", auth,async (req, res) => {
    const todo = await Task.findById(req.params.id);
     
    todo.completed = !(todo.completed);
    todo.save();
  
    res.send(todo);
  });





router.delete("/tasks/:id", async (req, res) => {
    const result = await Task.findByIdAndDelete(req.params.id);
  
    res.send(result);
  });

module.exports = router;
