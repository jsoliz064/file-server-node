require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();

const fileRoute = require("./routes/file");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: false,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

app.use(express.static('public'));

app.use("/", fileRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((db) => console.log("Connected to MongoDB Atlas", db.connection.name))
  .catch((error) => console.error(error));

app.listen(port, () => console.log(`Server listening to: http://localhost:${port}`));
