const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema({
  studentCode: {
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

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student