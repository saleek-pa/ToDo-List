const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const adminRouter = require("./routes/adminRoute");

app.use(cors());
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => console.log("Connected Successfully"));

app.listen(process.env.PORT, () => {
   console.log(`Server is running on port ${process.env.PORT}`);
});
