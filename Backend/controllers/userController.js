const Users = [
   {
      email: "alltrue@gmail.com",
      password: 123,
      role: "superAdmin",
      permissions: 1,
   },
   {
      email: "deletefalse@gmail.com",
      password: 123,
      role: "admin",
      permissions: 2,
   },
   {
      email: "readtrue@gmail.com",
      password: 123,
      role: "user",
      permissions: 3,
   },
   {
      email: "allfalse@gmail.com",
      password: 123,
      role: "member",
      permissions: 4,
   },
];

const Permissions = [
   {
      id: 1,
      read: true,
      create: true,
      delete: true,
   },
   {
      id: 2,
      read: true,
      create: true,
      delete: false,
   },
   {
      id: 3,
      read: true,
      create: false,
      delete: false,
   },
   {
      id: 4,
      read: false,
      create: false,
      delete: false,
   },
];

module.exports = {
   login: async (req, res) => {
      const { email, password } = req.body;
      const user = Users.find((user) => user.email === email && user.password === parseInt(password));
      if (user) res.status(200).json({ message: "success", permissionId: user.permissions });
      else res.status(404).json({ message: "failed" });
   },

   checkPermission: async (req, res) => {
      const { permissionId } = req.body;
      const populatePermission = Permissions.find((value) => value.id === parseInt(permissionId));
      return res.json({ permission: populatePermission });
   },
};
