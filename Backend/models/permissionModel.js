const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   module: {
      type: String,
      required: true,
   },
   permission: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
   },
});

module.exports = mongoose.model("Permission", permissionSchema);
