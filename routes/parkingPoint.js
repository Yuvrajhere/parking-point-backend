const express = require("express");
const router = express.Router();

const {
  addParkingPoint,
  getParkingPointsByAdminId,
  getParkingPointById,
  updateParkingPoint,
  deleteParkingPoint,
  getParkingPointsByCity,
} = require("../controllers/parkingPoint");
const { checkToken } = require("../controllers/auth");

// C - create
router.post("/", checkToken, addParkingPoint);

// R - read
// get all Parking Points with city name
router.get("/city/:city", checkToken, getParkingPointsByCity);

// get all Parking Points with admin ID
router.get("/admin", checkToken, getParkingPointsByAdminId);

// get Parking Point details
router.get("/parkingpoint/:parkingPointId", checkToken, getParkingPointById);

// U - update
router.put("/", checkToken, updateParkingPoint);

// D - delete
router.delete("/parkingpoint/:parkingPointId", checkToken, deleteParkingPoint);

module.exports = router;
