const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
addDelivery,addCreateGoodsReciept, acceptDeliveryBySiteManager
} = require("../controllers/Delivery.controller");

router.post("/order/:orderid", addDelivery);

router.post("/creategoodreciept", addCreateGoodsReciept);

router.post("/approve/:id", acceptDeliveryBySiteManager);

module.exports = router;
