const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

//routes

router.get("/signup", authController.getSingup);
router.get("/login", authController.getLogin);

module.exports = router;