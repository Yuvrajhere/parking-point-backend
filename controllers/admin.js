const Admin = require("../models/Admin");
const { genSaltSync, hashSync } = require("bcrypt");

const getAdminById = (req, res) => {
  Admin.findOne({ _id: req.body.adminId })
    .then((admin) => {
      admin.password = undefined;
      res.status(200).json({
        success: true,
        data: admin,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to get Admin!",
      });
    });
};

const addAdmin = (req, res) => {
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
  const admin = new Admin(req.body);
  admin
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

module.exports = {
  getAdminById,
  addAdmin,
};
