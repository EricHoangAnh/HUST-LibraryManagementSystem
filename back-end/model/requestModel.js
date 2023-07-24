const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema({
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
      userId: {
        type: String,
        required: false,
      }, 
      docId: {
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
      }
});

const Request = mongoose.model("Request", RequestSchema);
module.exports = Request;