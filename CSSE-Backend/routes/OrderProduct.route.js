const express = require("express");
const router = express.Router();

const {
  addOrderProductsToOrder,
  getOrderProductsDetails,
  getOrderProductsList,
  addOrderProductsToDelivery,
} = require("../controllers/OderProduct.controller");

router.get("/:id", getOrderProductsDetails);

router.get("/", getOrderProductsList);

router.post("/order/:id", addOrderProductsToOrder);

router.post("/delivery/:id", addOrderProductsToDelivery);

module.exports = router;
