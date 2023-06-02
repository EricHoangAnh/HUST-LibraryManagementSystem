const mongoose = require("mongoose");

const DocumentSchema = mongoose.Schema({
  documentCode: {
    type: Number,
    required: true,
  },
  documentTypeId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: true,
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
  },
});

const Document = mongoose.model("Document", DocumentSchema);
module.exports = Document;
