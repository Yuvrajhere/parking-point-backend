const Booking = require("../models/Booking");
const User = require("../models/User");
const dateAndTime = require("date-and-time");

const addBooking = (req, res) => {
  //Calculating the price for booking
  req.body.price = req.body.price * req.body.hours;

  //Checking if the user have enough coins for booking
  User.findById(req.body.userId)
    .populate("booking")
    .then((user) => {
      if (user.balance < req.body.price) {
        return res.status(403).json({
          success: false,
          message: "You dont have enough Parking Points!",
        });
      }

      if (
        user.booking.length > 0 &&
        new Date(user.booking[user.booking.length - 1].departure) > new Date()
      ) {
        return res.status(403).json({
          success: false,
          message: "You already have a Booked Parking!",
        });
      }

      //setting the user
      req.body.bookedBy = req.body.userId;

      //setting arrival
      let tempDateString =
        req.body.arrivalDate + "T" + req.body.arrivalTime + ":00";
      req.body.arrival = new Date(tempDateString);

      let tempDate = new Date(req.body.arrival);

      //setting departure
      req.body.departure = dateAndTime.addHours(tempDate, req.body.hours);

      //this sets current date as booking Date
      req.body.bookingDate = new Date();

      console.log("BROOOO ", req.body);

      const booking = new Booking(req.body);
      booking
        .save()
        .then((newBooking) => {
          User.findByIdAndUpdate(req.body.userId, {
            balance: user.balance - req.body.price,
            $push: { booking: newBooking._id },
          })
            .then((newUser) => {
              res.status(200).json({
                success: true,
                data: newBooking,
                message: "Booking saved successfully!",
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                success: false,
                message: "Failed to save Booking!",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Failed to save Booking!",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Failed to save Booking!",
      });
    });
};

module.exports = {
  addBooking,
};
