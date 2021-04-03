const express = require("express");
const router = express.Router();

const { adminSignin } = require("../controllers/auth");
const { getAdminById, addAdmin } = require("../controllers/admin");

router.get("/admin/:adminId", getAdminById);

router.post("/", addAdmin);

router.post("/signin", adminSignin);

module.exports = router;