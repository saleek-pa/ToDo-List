const User = require("../models/userModel");
const Permission = require("../models/permissionModel");

const checkPermissions = (requiredPermissions) => {
   return async (req, res, next) => {
      try {
         const userId = req.headers.userid;
         const user = await User.findById(userId).populate({
            path: "role",
            populate: {
               path: "permissionIds",
               model: "Permission",
            },
         });

         const userPermissions = user.role.permissionIds.map((obj) => obj.permission);
         if (userPermissions.includes(requiredPermissions)) {
            next();
         } else {
            return res.status(401).json({ message: "You don't have the required permissions" });
         }
      } catch (error) {
         console.error("Error checking permissions:", error);
         res.status(500).json({ message: "Internal Server Error" });
      }
   };
};

module.exports = checkPermissions;
