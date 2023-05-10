const mongoose = require("mongoose");

const DocumentSchema = mongoose.Schema({
  documentCode: {
    type: Number,
    required: true,
  },
  documentTypeId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishYear: {
    type: Number,
    required: true,
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