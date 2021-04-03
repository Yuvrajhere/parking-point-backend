const { compareSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

const signin = (req, res) => {
  const body = req.body;
  if (!body.email && !body.password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password.",
    });
  }
  console.log(body);
  User.findOne({ email: body.email }, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server error!",
      });
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password!",
      });
    }

    const result = compareSync(body.password, user.password);

    if (result) {
      user.password = undefined;
      const jsonwebtoken = sign({ id: user.id,  }, process.env.SECRET, {
        expiresIn: "1h",
      });
      return res.json({
        success: true,
        message: "login successfull!",
        token: jsonwebtoken,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password!",
      });
    }
  });
};

const adminSignin = (req, res) => {
  const body = req.body;
  if (!body.email && !body.password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password.",
    });
  }
  console.log(body);
  Admin.findOne({ email: body.email }, function (err, admin) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server error!",
      });
    }
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const result = compareSync(body.password, admin.password);

    if (result) {
      admin.password = undefined;
      const jsonwebtoken = sign({ id: admin.id, isAdmin: true }, process.env.SECRET, {
        expiresIn: "1h",
      });
      return res.json({
        success: true,
        message: "admin signin successfull.",
        token: jsonwebtoken,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
  });
};

// const checkToken = (req, res, next) => {
//   let header = req.get("authorization");
//   // console.log(header);
//   if (header) {
//     var token = header.split(" ")[1];
//     // console.log(token);
//     verify(token, process.env.SECRET, (err, decoded) => {
//       if(err) {
//         res.json({
//           success: false,
//           message: err.message
//         })
//       } else {
//         next();
//       }
//     });
//   } else {
//     return res.json({
//       success: false,
//       message: "Access denied! Unauthorized user",
//     });
//   }
// };

// const isAdmin = (req, res, next) => {
//   let header = req.get("authorization");
//   // console.log(header);
//   if (header) {
//     var token = header.split(" ")[1];
//     // console.log(token);
//     verify(token, process.env.SECRET, (err, decoded) => {
//       if(err) {
//         res.json({
//           success: false,
//           message: err.message
//         })
//       } else {
//         console.log("decoded",decoded);
//         next();
//       }
//     });
//   } else {
//     return res.json({
//       success: false,
//       message: "Access denied! Unauthorized user",
//     });
//   }
// };

module.exports = {
  signin,
  adminSignin,
  // checkToken,
  // isAdmin,
};
