const Booking = require("../models/Booking");
const User = require("../models/User");

const addBooking = (req, res) => {
  //Calculating the price for booking
  req.body.price = req.body.price * req.body.hours;

  //Checking if the user have enough coins for booking
  User.findById(req.body.userId)
    .then((user) => {
      if (user.balance < req.body.price) {
        return res.status(403).json({
          success: false,
          message: "You dont have enough Parking Points!",
        });
      }
      //setting the user
      req.body.bookedBy = req.body.userId;

      //setting arrival
      let tempDateString =
        req.body.arrivalDate + "T" + req.body.arrivalTime + ":00";
      req.body.arrival = new Date(tempDateString);

      let tempDate = req.body.arrival;

      Date.prototype.addHours = function (h) {
        this.setTime(this.getTime() + h * 60 * 60 * 1000);
        return this;
      };

      //setting departure
      req.body.departure = tempDate.addHours(req.body.hours);

      //this sets current date as booking Date
      req.body.bookingDate = new Date();

      console.log("BROOOO ", req.body);

      const booking = new Booking(req.body);
      booking
        .save()
        .then((newBooking) => {
          User.findByIdAndUpdate(req.body.userId, {
            balance: user.balance - req.body.price,
          })
            .then((newUser) => {
              res.status(200).json({
                success: true,
                data: newBooking,
                message: "Booking saved successfully!",
              });
            })
            .catch((err) => {
              res.status(200).json({
                success: true,
                data: newBooking,
                message: "Booking saved successfully!",
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

// hours: 0,
//     price: "",
//     parking: parkingId,

// use this code for

//   let temp = "2021-04-16" + "T00:40:00";
// let newDate = new Date(temp);
// console.log(newDate);

module.exports = {
  addBooking,
};
