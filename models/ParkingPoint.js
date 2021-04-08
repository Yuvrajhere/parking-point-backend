const mongoose = require("mongoose");

const parkingPointSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [1, "name length should be between 1 and 30."],
    maxLength: [30, "name length should be between 1 and 30."],
    required: [true, "Please provide name."],
  },
  addressLine1: {
    type: String,
    minLength: [3, "address line 1 length should be between 3 and 30."],
    maxLength: [30, "address line 1 length should be between 3 and 30."],
    required: [true, "Please provide address line 1."]
  },
  addressLine2: {
    type: String,
    minLength: [3, "address line 2 length should be between 3 and 30."],
    maxLength: [30, "address line 2 length should be between 3 and 30."],
    required: [true, "Please provide address line 2."]
  },
  state: {
    type: String,
    minLength: [3, "state length should be between 3 and 20."],
    maxLength: [20, "state length should be between 3 and 20."],
    required: [true, "Please provide state."],
  },
  city: {
    type: String,
    minLength: [3, "city length should be between 1 and 20."],
    maxLength: [20, "city length should be between 1 and 20."],
    required: [true, "Please provide city."]
  },
  pincode: {
    type: String,
    minLength: [6, "pincode length should be exactly 6."],
    maxLength: [6, "pincode length should be exactly 6."],
    required: [true, "Please provide pincode."]
  },
  latitude: {
    type: Number,
    min: [-90, "latitude value should be between -90 and 90."],
    max: [90, "latitude value should be between -90 and 90."],
    required: [true, "Please provide latitude."]
  },
  longitude: {
    type: Number,
    min: [-180, "longitude value should be between -180 and 180."],
    max: [180, "longitude value should be between -180 and 180."],
    required: [true, "Please provide longitude."]
  },
  email: {
    type: String,
    minLength: [5, "Email length should be between 5 and 30."],
    maxLength: [30, "Email length should be between 5 and 30."],
    required: [true, "Please provide email."]
  },
  phone: {
    type: String,
    minLength: [10, "Phone number length should be 10 digits."],
    maxLength: [10, "Phone number length should be 10 digits."],
    required: [true, "Please provide Phone number."]
  },
  createdBy: {
    type: mongoose.ObjectId,
    ref: "Admin",
    required: [true, "Please provide the admin ID."]
  }
}, {timestamps: true});

module.exports = mongoose.model("ParkingPoint", parkingPointSchema);