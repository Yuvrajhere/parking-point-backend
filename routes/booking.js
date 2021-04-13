const express = require("express");
const router = express.Router();

const {
  addBooking
} = require("../controllers/booking");
const { checkToken } = require("../controllers/auth");

// C - create
router.post("/", checkToken, addBooking);

// setBookingDetails({
//   ...bookingDetails,
//   arrival: new Date(bookingDetails.arrivalDate + ", " + bookingDetails.arrivalTime).toLocaleString(),
// })

// arrival: "",
//   departure: "",
//   bookingDate: "",


// R - read
// router.get("/admin", checkToken, getParkingsByAdminId);
// router.get("/parking/:parkingId", checkToken, getParkingById);
// router.get("/parkingpoint/:parkingPointId", checkToken, getParkingsByParkingPointId);

// U - update
// router.put("/", checkToken, updateParking);

// D - delete
// router.delete("/parking/:parkingId", checkToken, deleteParking);

module.exports = router;