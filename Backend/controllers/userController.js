const User = require("../models/userModel");
const Todo = require("../models/toDoModel");

module.exports = {
   login: async (req, res) => {
      const { email, password } = req.body;
      const user = await User.findOne({ email, password });

      if (user) {
         res.status(200).json({ message: "Success", userId: user._id });
      } else {
         res.status(404).json({ message: "Failed" });
      }
   },



   viewTask: async (req, res) => {
      const tasks = await Todo.find();
      res.status(200).json({ tasks });
   },



   addTask: async (req, res) => {
      const { task } = req.body;
      if (!task) {
         return res.status(400).json({ message: "Text is required for a task." });
      }

      const newTask = new Todo({ task });
      const savedTask = await newTask.save();

      res.status(201).json({ message: "Task added successfully", task: savedTask });
   },



   deleteTask: async (req, res) => {
      const taskId = req.params.id;
      if (!taskId) {
         return res.status(400).json({ message: "Task ID is required for deletion." });
      }

      const deletedTask = await Todo.findByIdAndDelete(taskId);
      if (!deletedTask) {
         return res.status(404).json({ message: "Task not found." });
      }

      res.status(200).json({ message: "Task deleted successfully", deletedTask });
   },
};
