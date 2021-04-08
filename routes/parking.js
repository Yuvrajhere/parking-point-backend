const express = require("express");
const router = express.Router();

const {
  addParking,
  getParkingsByAdminId,
  getParkingById,
  updateParking,
  deleteParking,
} = require("../controllers/parking");
const { checkToken } = require("../controllers/auth");

// C - create
router.post("/", checkToken, addParking);

// R - read
router.get("/admin", checkToken, getParkingsByAdminId);
router.get("/parking/:parkingId", checkToken, getParkingById);

// U - update
router.put("/", checkToken, updateParking);

// D - delete
router.delete("/parking/:parkingId", checkToken, deleteParking);

module.exports = router;
