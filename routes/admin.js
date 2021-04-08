const express = require("express");
const router = express.Router();

const { adminSignin, checkToken } = require("../controllers/auth");
const { getAdminById, addAdmin } = require("../controllers/admin");

router.get("/admin/", checkToken, getAdminById);

router.post("/", addAdmin);

router.post("/signin", adminSignin);

module.exports = router;