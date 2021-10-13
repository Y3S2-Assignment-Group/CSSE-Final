const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getManagerDetails, loginManager, registerManager 
} = require("../controllers/Manager.controller");


router.post("/register", registerManager);
router.post("/login", loginManager);
router.get("/", auth, getManagerDetails);

module.exports = router;
