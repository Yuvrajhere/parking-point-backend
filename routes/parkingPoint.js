const express = require("express");
const router = express.Router();

const {
  addParkingPoint,
  getPArkingPointsByAdminId,
  getPArkingPointById,
  updateParkingPoint,
  deleteParkingPoint,
  getPArkingPointsByCity,
} = require("../controllers/parkingPoint");

router.get("/parkingpoint/:id", getPArkingPointById);
router.get("/:adminId", getPArkingPointsByAdminId);
router.get("/city/:city", getPArkingPointsByCity);
router.post("/", addParkingPoint);
router.put("/", updateParkingPoint);
router.delete("/parkingpoint/:id", deleteParkingPoint);

module.exports = router;
