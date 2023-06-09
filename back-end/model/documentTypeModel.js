const mongoose = require("mongoose");

const DocumentTypeSchema = mongoose.Schema({
  documentTitle: {
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