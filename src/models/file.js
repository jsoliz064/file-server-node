const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  postulante_id: {
    type: Number,
    required: true,
  },
  cargo_id: {
    type: Number,
    required: true
  },
  file_path: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('File', fileSchema);