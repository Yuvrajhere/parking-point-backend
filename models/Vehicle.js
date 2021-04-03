const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  modelName: {
    type: String,
    minLength: [1, "model name length should be between 1 and 12."],
    maxLength: [12, "model name length should be between 1 and 12."],
    required: [true, "Please provide model name."]
  },
  brand: {
    type: String,
    minLength: [1, "brand length should be between 1 and 12."],
    maxLength: [12, "brand length should be between 1 and 12."],
    required: [true, "Please provide brand."]
  },
  category: {
    type: String,
    enum: ["Scooter", "Bike", "Rickshaw", "Car", "Van", "Bus", "Truck"],
    required: [true, "Please provide category."]
  },
  registrationNumber: {
    type: String,
    minLength: [10, "registration number length should be exactly 10."],
    maxLength: [10, "registration number length should be exactly 10."],
    required: [true, "Please provide registration number."]
  },
}, {timestamps: true});

module.exports = mongoose.model("Vehicle", vehicleSchema);