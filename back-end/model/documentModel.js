const mongoose = require("mongoose");

const DocumentSchema = mongoose.Schema({
  documentCode: {
    type: Number,
    required: false,
  },
  documentTypeId: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  file: {
    type: Object,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  }
});

const Document = mongoose.model("Document", DocumentSchema);
module.exports = Document;
