const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: [1, "First Name length should be between 1 and 12."],
      maxLength: [12, "First Name length should be between 1 and 12."],
      required: [true, "Please provide First Name."],
    },
    lastName: {
      type: String,
      minLength: [1, "Last Name length should be between 1 and 12."],
      maxLength: [12, "Last Name length should be between 1 and 12."],
      required: [true, "Please provide Last Name."],
    },
    email: {
      type: String,
      minLength: [5, "Email length should be between 5 and 30."],
      maxLength: [30, "Email length should be between 5 and 30."],
      required: [true, "Please provide Email."],
      unique: [true, "This Email is already used."],
    },
    phone: {
      type: String,
      minLength: [10, "Phone Number length should be 10 digits."],
      maxLength: [10, "Phone Number length should be 10 digits."],
      required: [true, "Please provide Phone Number."],
      unique: [true, "This Phone Number is already used."],
    },
    password: {
      type: String,
      minLength: [20, "Password cannot be less than 20 characters."],
      required: [true, "Please provide Password."],
    },
    booking: [
      {
        type: mongoose.ObjectId,
        ref: "Booking",
      },
    ],
    savedParkingPoints: [
      {
        type: mongoose.ObjectId,
        ref: "ParkingPoint",
      },
    ],
    balance: {
      type: Number,
      min: [0, "Balance cannot be less than 0."],
      default: 150,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
