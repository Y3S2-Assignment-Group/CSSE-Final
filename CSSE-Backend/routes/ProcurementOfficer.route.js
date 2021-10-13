const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getProcurementOfficerDetails, loginProcurementOfficer, registerProcurementOfficer 
} = require("../controllers/ProcurementOfficer.controller");


router.post("/register", registerProcurementOfficer);
router.post("/login", loginProcurementOfficer);
router.get("/", auth, getProcurementOfficerDetails);

module.exports = router;