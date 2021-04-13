const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  arrival: {
    type: Date,
    required: [true, "Please provide arrival date and time."],
  },
  departure: {
    type: Date,
    required: [true, "Please provide departure date and time."]
  },
  price: {
    type: Number,
    min: [5, "price should be between 5 and 5000."],
    max: [5000, "price should be between 5 and 5000."],
    required: [true, "Please provide price."]
  },
  bookingDate: {
    type: Date,
    required: [true, "Please provide booking date and time."]
  },
  parking: {
    type: mongoose.ObjectId,
    ref: "Parking",
    required: [true, "Please provide Parking ID."]
  },
  bookedBy: {
    type: mongoose.ObjectId,
    ref: "User",
    required: [true, "Please provide User ID."]
  }
}, {timestamps: true});

module.exports = mongoose.model("Booking", bookingSchema);