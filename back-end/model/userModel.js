const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  account: {
    unique: String,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  dob: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
