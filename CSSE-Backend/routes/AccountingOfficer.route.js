const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getAccountingOfficerDetails, loginAccountingOfficer, registerAccountingOfficer 
} = require("../controllers/AccountingOfficer.controller");


router.post("/register", registerAccountingOfficer);
router.post("/login", loginAccountingOfficer);
router.get("/", auth, getAccountingOfficerDetails);

module.exports = router;
