const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/", userRouter);

app.listen(4000, () => {
   console.log("Server is running on port 3000");
});
