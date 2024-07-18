const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  fileName: {
    type: String,
    required: false,
  },
  fileExtension: {
    type: String,
    required: false,
  },
  filePath: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("files", fileSchema);
