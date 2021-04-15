const express = require("express");
const router = express.Router();

const { signin, checkToken } = require("../controllers/auth");
const { getUserById, addUser, updateUserById, addParkingPointToSaved } = require("../controllers/user");

// creating a user
router.post("/", addUser);

// saving Parking Point to user account
router.post("/saveparkingpoint", checkToken, addParkingPointToSaved);

// get a user's data
router.get("/user/", checkToken, getUserById);

// login of user
router.post("/signin", signin);

// updating user data
router.put("/user", checkToken, updateUserById);

module.exports = router;