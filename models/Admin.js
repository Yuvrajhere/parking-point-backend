const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: [1, "firstname length should be between 1 and 12."],
    maxLength: [12, "firstname length should be between 1 and 12."],
    required: [true, "Please provide firstname."]
  },
  lastName: {
    type: String,
    minLength: [1, "lastname length should be between 1 and 12."],
    maxLength: [12, "lastname length should be between 1 and 12."],
    required: [true, "Please provide lastname."]
  },
  email: {
    type: String,
    minLength: [5, "Email length should be between 5 and 20."],
    maxLength: [30, "Email length should be between 5 and 30."],
    required: [true, "Please provide email."]
  },
  phone: {
    type: String,
    minLength: [12, "Phone number length should be 12 digits."],
    maxLength: [12, "Phone number length should be 12 digits."],
    required: [true, "Please provide Phone number."]
  },
  password: {
    type: String,
    minLength: [20, "Password cannot be less than 20 characters."],
    required: [true, "Please provide password."]
  },
}, {timestamps: true});

module.exports = mongoose.model("Admin", adminSchema);