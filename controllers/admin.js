const Admin = require("../models/Admin");
const { genSaltSync, hashSync } = require("bcrypt");

const getAdminById = (req, res) => {
  Admin
    .findOne({ _id: req.params.adminId })
    .then((admin) => {
      console.log("Check boi!");
      admin.password = undefined;
      res.status(200).json({
        success: true,
        data: admin,
      });
    })
    .catch((err) => {
      console.log("Check err boi!");
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to get Admin!",
      });
    });
    console.log("Hello")
};

const addAdmin = (req, res) => {
  const { body } = req;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  const admin = new Admin(body);
  admin
    .save()
    .then((response) => {
      res.status(200).json({
        success: true,
        data: response,
        message: "Admin saved successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to save admin!",
      });
    });
};

module.exports = {
  getAdminById,
  addAdmin,
};
