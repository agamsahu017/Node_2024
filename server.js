require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to db"));

app.use(express.json());

//routes

const subscriberRouter = require("./routes/subscribers");
app.use("/subscriber", subscriberRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
