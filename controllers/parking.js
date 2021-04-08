const Parking = require("../models/Parking");
const ParkingPoint = require("../models/ParkingPoint");

const addParking = (req, res) => {
  req.body.createdBy = req.body.adminId;
  const parking = new Parking(req.body);
  parking
    .save()
    .then((newParking) => {
      res.status(200).json({
        success: true,
        data: newParking,
        message: "Parking saved successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to save Parking!",
      });
    });
};

const getParkingsByAdminId = (req, res) => {
  Parking.find({ createdBy: req.body.adminId })
    .populate("parkingPoint")
    .then((parkings) => {
      console.log(parkings)
      res.status(200).json({
        success: true,
        data: parkings,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to get Parkings!",
      });
    });
};

const getParkingById = (req, res) => {
  Parking.findOne({ _id: req.params.parkingId })
    .populate("parkingPoint")
    .then((parkings) => {
      res.status(200).json({
        success: true,
        data: parkings,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to get Parkings!",
      });
    });
};

const updateParking = (req, res) => {
  Parking.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  })
    .then((updatedParking) => {
      res.status(200).json({
        success: true,
        data: updatedParking,
        message: "Parking updated successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to update Parking Point!",
      });
    });
};

const deleteParking = (req, res) => {
  Parking.findByIdAndDelete(req.params.parkingId)
    .then((response) => {
      res.status(200).json({
        success: true,
        message: "Parking deleted successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to delete Parking!",
      });
    });
};

module.exports = {
  addParking,
  getParkingsByAdminId,
  getParkingById,
  updateParking,
  deleteParking
};
