const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

//routes

router.get("/signup", authController.getSingup);
router.post("/singup", authController.signUp);
router.get("/login", authController.getLogin);

module.exports = router;