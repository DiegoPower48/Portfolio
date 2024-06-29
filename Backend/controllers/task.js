"use strict";

const Task = require("../models/task");

const controller = {
  getTasks: async (req, res) => {
    const task = await Task.find({ user: req.user.id });
    res.json(task);
  },

  createTask: async (req, res) => {
    const { title, description, date } = req.body;
    const newtask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });
    const savedTask = await newtask.save();
    res.json(savedTask);
  },

  getTask: async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("tarea no encontrada");
    }
    res.json(task);
  },

  updateTask: async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).send("tarea no encontrada");
    }
    res.json(task);
  },

  deleteTask: async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send("tarea no encontrada");
    }
    res.status(204).send("tarea borrada");
  },
};

module.exports = controller;
