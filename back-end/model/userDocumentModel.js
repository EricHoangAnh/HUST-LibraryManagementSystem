const mongoose = require("mongoose");

const UserDocumentSchema = mongoose.Schema({
  documentCode: {
    type: Number,
    required: false,
  },
  documentTypeId: {
    type: String,
    required: false,
  },
  typeInfo: {
    type: Object,
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
  },
  photo: {
    type: String,
    required: false,
  },
  createdAt: {
    type: String,
    required: false,
  },
  lastUpdate: {
    type: String,
    required: false,
  },
  downloadQuantity: {
    type: Number,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
  status: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: String,
    required: false,
  },
});

const UserDocument = mongoose.model("UserDocument", UserDocumentSchema);
module.exports = UserDocument;
