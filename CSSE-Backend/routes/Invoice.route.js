const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
    addInvoice,updateInvoicePaymentStatus
} = require("../controllers/Invoice.controller");

router.post("/", addInvoice);
router.post("/updateInvoicePaymentStatus/:id/:orderid", updateInvoicePaymentStatus);

module.exports = router;
