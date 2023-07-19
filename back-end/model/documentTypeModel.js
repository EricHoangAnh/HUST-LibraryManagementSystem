const mongoose = require("mongoose");

const DocumentTypeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: false
  }
});

const DocumentType = mongoose.model("DocumentType", DocumentTypeSchema);
module.exports = DocumentType;