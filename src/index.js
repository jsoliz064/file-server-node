const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fileRoute = require("./routes/file");
// settings
const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload({
  useTempFiles: false,
  tempFileDir: '/tmp/',
  createParentPath: true,
}));
app.use("/api", fileRoute);

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then((db) => console.log("Connected to MongoDB Atlas", db.connection.name))
  .catch((error) => console.error(error));
// server listening
app.listen(port, () => console.log("Server listening to", port));
