const mongoose = require("mongoose");
const User = require("../models/userModel");
const Role = require("../models/roleModel");
const Permission = require("../models/permissionModel");

module.exports = {
   login: async (req, res) => {
      const { email, password } = req.body;
      console.log(email, password);

      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
         res.status(200).json({ message: "Success" });
      } else {
         res.status(401).json({ message: "Failed" });
      }
   },

   viewUsers: async (req, res) => {
      const users = await User.find().populate({
         path: "role",
         populate: {
            path: "permissionIds",
            model: "Permission",
         },
      });
      res.status(200).json({ message: "Success", users });
   },

   changePermission: async (req, res) => {
      const userId = req.params.id;
      const permissions = req.body.permission;

      const user = await User.findById(userId).populate("role");

      const allPermission = await Permission.find();
      const matchingPermissionIds = allPermission
         .filter((permission) => permissions.includes(permission.permission))
         .map((permission) => permission._id);

      await Role.findByIdAndUpdate(user.role._id, { $set: { permissionIds: matchingPermissionIds } });

      res.status(200).json({ message: "Permissions updated successfully" });
   },
};
