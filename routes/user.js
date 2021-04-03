const express = require("express");
const router = express.Router();

const { signin } = require("../controllers/auth");
const { getUserById, addUser } = require("../controllers/user");

// get a user's data
router.get("/user/:userId", getUserById);

// creating a user
router.post("/", addUser);

// login of user
router.post("/signin", signin);

module.exports = router;