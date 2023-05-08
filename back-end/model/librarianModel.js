const mongoose = require("mongoose");

const LibrarianSchema = mongoose.Schema({
  LibrarianCode: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
});

const Librarian = mongoose.model("Librarian", LibrarianSchema);
module.exports = Librarian;
