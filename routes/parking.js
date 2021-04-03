const express = require("express");
const router = express.Router();

const {
  addParking,
  getParkingsByAdminId,
  getParkingById,
  updateParking,
  deleteParking,
} = require("../controllers/parking");

router.post("/", addParking);
router.get("/:adminId", getParkingsByAdminId);
router.get("/parking/:parkingId", getParkingById);
router.put("/", updateParking);
router.delete("/parking/:parkingId", deleteParking);

module.exports = router;
