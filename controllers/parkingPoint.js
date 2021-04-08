const ParkingPoint = require("../models/ParkingPoint");

const addParkingPoint = (req, res) => {
  req.body.createdBy = req.body.adminId;
  req.body.city = req.body.city.toLowerCase();
  const parkingPoint = new ParkingPoint(req.body);
  parkingPoint
    .save()
    .then((response) => {
      res.status(200).json({
        success: true,
        data: response,
        message: "Parking Point saved successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to save Parking Point!",
      });
    });
};

const getParkingPointsByAdminId = (req, res) => {
  ParkingPoint.find(
    { createdBy: req.body.adminId },
    function (err, parkingPoints) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server error!",
        });
      }
      if (!parkingPoints) {
        return res.status(400).json({
          success: false,
          message: "Invalid Admin ID",
        });
      }

      return res.status(200).json({
        success: true,
        data: parkingPoints,
      });
    }
  );
};

const getParkingPointById = (req, res) => {
  ParkingPoint.findOne(
    { _id: req.params.parkingPointId },
    function (err, parkingPoint) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server error!",
        });
      }
      if (!parkingPoint) {
        return res.status(400).json({
          success: false,
          message: "Invalid Parking Point ID",
        });
      }

      return res.status(200).json({
        success: true,
        data: parkingPoint,
      });
    }
  );
};

const updateParkingPoint = (req, res) => {
  ParkingPoint.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    .then((response) => {
      res.status(200).json({
        success: true,
        data: response,
        message: "Parking Point updated successfully!",
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

const deleteParkingPoint = (req, res) => {
  ParkingPoint.findByIdAndDelete(req.params.parkingPointId)
    .then((response) => {
      res.status(200).json({
        success: true,
        message: "Parking Point deleted successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to delete Parking Point!",
      });
    });
};

const getParkingPointsByCity = (req, res) => {
  console.log("Anyone looking for me?")
  ParkingPoint.find({ city: req.params.city.toLowerCase() }, function (err, parkingPoints) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server error!",
      });
    }
    if (!(parkingPoints.length > 0)) {
      return res.status(400).json({
        success: false,
        message: "No Parking found for this city!",
      });
    }

    return res.status(200).json({
      success: true,
      data: parkingPoints,
    });
  });
};

module.exports = {
  addParkingPoint,
  getParkingPointsByAdminId,
  getParkingPointById,
  updateParkingPoint,
  deleteParkingPoint,
  getParkingPointsByCity,
};
