const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   permissionIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Permission",
   },
   isDefault: {
      type: Boolean,
      default: false,
   },
});

module.exports = mongoose.model("Role", roleSchema);
