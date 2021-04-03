const Parking = require("../models/Parking");
const ParkingPoint = require("../models/ParkingPoint");

const addParking = (req, res) => {
  console.log(req.body);
  const parking = new Parking(req.body);
  parking
    .save()
    .then((newParking) => {
      // ParkingPoint.findOneAndUpdate(
      //   { _id: req.body.parkingPoint },
      //   { $push: { parkings: newParking._id } },
      //   {
      //     new: true,
      //   }
      // )
      //   .then((response) => {
      res.status(200).json({
        success: true,
        data: newParking,
        message: "Parking saved successfully!",
      });
      // })
      // .catch((err) => {
      //   console.log(err);
      //   res.status(500).json({
      //     success: false,
      //     message: "Failed to save Parking!",
      //   });
      // });
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
  Parking.find({ createdBy: req.params.adminId })
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
  console.log(req.body);

  // const newParkingPoint = req.body.parkingPoint;

  // req.body.parkingPoint = undefined;

  // Parking.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
  //   .then((partialUpdatedParking) => {
  //     const oldParkingPoint = partialUpdatedParking.parkingPoint;
  //     const parkingId = partialUpdatedParking._id;

  //     ParkingPoint.findByIdAndUpdate(
  //       oldParkingPoint,
  //       { $pull: { parkings: { parkingId } } },
  //       { safe: true, upsert: true }
  //     )
  //       .then((response) => {
  //         Parking.findOneAndUpdate(
  //           { _id: req.body._id },
  //           { parkingPoint: newParkingPoint },
  //           { new: true }
  //         )
  //           .then((updatedParking) => {
  //             ParkingPoint.findOneAndUpdate(
  //               { _id: updateParking.parkingPoint },
  //               { $push: { parkings: updateParking._id } },
  //               {
  //                 new: true,
  //               }
  //             )
  //               .then((response) => {
  //                 res.status(200).json({
  //                   success: true,
  //                   data: updatedParking,
  //                   message: "Parking updated successfully!",
  //                 });
  //               })
  //               .catch((err) => {
  //                 console.log(err);
  //                 res.status(500).json({
  //                   success: false,
  //                   message: "Failed to update Parking Point!",
  //                 });
  //               });
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             res.status(500).json({
  //               success: false,
  //               message: "Failed to update Parking Point!",
  //             });
  //           });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         res.status(500).json({
  //           success: false,
  //           message: "Failed to update Parking Point!",
  //         });
  //       });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({
  //       success: false,
  //       message: "Failed to update Parking Point!",
  //     });
  //   });
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
