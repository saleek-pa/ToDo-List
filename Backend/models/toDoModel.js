const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
   task: {
      type: String,
      required: true,
   },
});

module.exports = mongoose.model("Todo", toDoSchema);
