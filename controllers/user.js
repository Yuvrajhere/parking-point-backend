const User = require("../models/User");
const { genSaltSync, hashSync } = require("bcrypt");

const getUserById = (req, res) => {
  User.findOne({ _id: req.body.userId })
    .populate({
      path: "booking",
      populate: {
        path: "parking",
        populate: {
          path: "parkingPoint",
        },
      },
    })
    .populate({
      path: "savedParkingPoints",
    })
    .then((user) => {
      let tempBooking = user.booking.reverse();
      user.booking = tempBooking;
      user.password = undefined;
      res.status(200).json({
        success: true,
        data: user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to get User!",
      });
    });
};

const addParkingPointToSaved = (req, res) => {
  User.findById(req.body.userId)
    .then((user) => {
      if (user.savedParkingPoints.includes(req.body.parkingPointId)) {
        return res.status(409).json({
          success: false,
          message: "Parking Point already saved!",
        });
      }

      User.findByIdAndUpdate(req.body.userId, {
        $push: { savedParkingPoints: req.body.parkingPointId },
      })
        .then((newUser) => {
          res.status(200).json({
            success: true,
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
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to save Parking Point!",
      });
    });
};

const addUser = (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(422).json({
      success: false,
      message: `Insufficient data provided!`,
    });
  }

  if (password.length < 6 || password.length > 10) {
    return res.status(422).json({
      success: false,
      message: `Password length should be between 6 and 10!`,
    });
  }

  const salt = genSaltSync(10);
  req.body.password = hashSync(req.body.password, salt);
  const user = new User(req.body);
  user
    .save()
    .then((response) => {
      res.status(200).json({
        success: true,
        data: response,
        message: "Signed Up Successfully!",
      });
    })
    .catch((err) => {
      if (err.name == "MongoError" && err.code == 11000) {
        res.status(409).json({
          success: false,
          message: `This ${Object.keys(err.keyPattern)[0]} is already used!`,
        });
      } else if (err.name == "ValidationError") {
        res.status(422).json({
          success: false,
          message: Object.values(err.errors)[0].message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to Sign Up, Please try again after some time!",
        });
      }
    });
};

const updateUserById = (req, res) => {
  User.findOne({ _id: req.body.userId })
    .then((user) => {
      console.log("USER IN UPDATE ", user);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User does not exist!",
        });
      }

      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.phone = req.body.phone;

      user
        .save()
        .then((response) => {
          res.status(200).json({
            success: true,
            data: response,
            message: "User updated Successfully!",
          });
        })
        .catch((err) => {
          if (err.name == "MongoError" && err.code == 11000) {
            res.status(409).json({
              success: false,
              message: `This ${
                Object.keys(err.keyPattern)[0]
              } is already used!`,
            });
          } else if (err.name == "ValidationError") {
            res.status(422).json({
              success: false,
              message: Object.values(err.errors)[0].message,
            });
          } else {
            res.status(500).json({
              success: false,
              message: "Failed to Update User!",
            });
          }
        });
    })
    .catch((err) => {
      console.log(err);
      if (err.name == "MongoError" && err.code == 11000) {
        res.status(409).json({
          success: false,
          message: `This ${Object.keys(err.keyPattern)[0]} is already used!`,
        });
      } else if (err.name == "ValidationError") {
        res.status(422).json({
          success: false,
          message: Object.values(err.errors)[0].message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to Update User!",
        });
      }
    });
};

module.exports = {
  getUserById,
  addUser,
  updateUserById,
  addParkingPointToSaved,
};
