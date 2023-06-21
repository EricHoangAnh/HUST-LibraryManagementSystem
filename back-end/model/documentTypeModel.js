const mongoose = require("mongoose");

const DocumentTypeSchema = mongoose.Schema({
  typeTitle: {
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