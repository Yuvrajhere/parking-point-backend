const ParkingPoint = require("../models/ParkingPoint");

const getPArkingPointsByAdminId = (req, res) => {
  console.log(req.params);
  ParkingPoint.find(
    { createdBy: req.params.adminId },
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

      return res.json({
        success: true,
        data: parkingPoints
      });
    }
  );
};

const getPArkingPointById = (req, res) => {
  ParkingPoint.findOne(
    { _id: req.params.id },
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

      return res.json({
        success: true,
        data: parkingPoint
      });
    }
  );
};

const addParkingPoint = (req, res) => {
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

const updateParkingPoint = (req, res) => {
  console.log(req.body);
  ParkingPoint
    .findOneAndUpdate({_id: req.body._id}, req.body, { new: true })
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
}

const deleteParkingPoint = (req, res) => {
  ParkingPoint
    .findByIdAndDelete(req.params.id)
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
}

const getPArkingPointsByCity = (req, res) => {
  ParkingPoint.find(
    { city: req.params.city },
    function (err, parkingPoints) {
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
          message: "No parking found for this city!",
        });
      }

      return res.json({
        success: true,
        data: parkingPoints
      });
    }
  );
}

module.exports = {
  addParkingPoint,
  getPArkingPointsByAdminId,
  getPArkingPointById,
  updateParkingPoint,
  deleteParkingPoint,
  getPArkingPointsByCity
};
