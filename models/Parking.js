const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema(
  {
    //name -> can be like 2-wheelers, cars, vans, trucks, buses, etc.
    name: {
      type: String,
      minLength: [1, "name length should be between 1 and 30."],
      maxLength: [30, "name length should be between 1 and 30."],
      required: [true, "Please provide name."],
    },
    maxCapacity: {
      type: Number,
      min: [5, "max capacity should be between 5 and 50."],
      max: [50, "max capacity should be between 5 and 50."],
      required: [true, "Please provide max capacity."],
    },
    availableCapacity: {
      type: Number,
      min: [0, `available capacity should be between 0 and 50.`],
      max: [50, `available capacity should be between 0 and 50.`],
      default: 0,
    },
    height: {
      type: Number,
      min: [1, "height should be between 1 and 20 metres."],
      max: [20, "height should be between 1 and 20 metres."],
    },
    length: {
      type: Number,
      min: [3, "length should be between 3 and 50 metres."],
      max: [50, "length should be between 3 and 50 metres."],
    },
    width: {
      type: Number,
      min: [1, "width should be between 1 and 20 metres."],
      max: [20, "width should be between 1 and 20 metres."],
    },
    price: {
      type: Number,
      min: [5, "price should be between 5 and 5000 rupees."],
      max: [5000, "price should be between 5 and 5000 rupees."],
      required: [true, "Please provide price."],
    },
    parkingPoint: {
      type: mongoose.ObjectId,
      ref: "ParkingPoint",
      required: [true, "Please provide Parking Point ID."],
    },
    createdBy: {
      type: mongoose.ObjectId,
      ref: "Admin",
      required: [true, "Please provide the admin ID."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parking", parkingSchema);
