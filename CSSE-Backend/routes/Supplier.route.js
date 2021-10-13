const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getSupplierList,
  getSupplierDetails,
  loginSupplier,
  registerSupplier,
  getPlacedOrdersForEachSupplier,
  getAcceptedOrCompletedOrdersForEachSupplier,
  getSupplierProductsList,
  getSupplierDetailsById
} = require("../controllers/Supplier.controller");

router.get("/:id/acceptedorcompletedorders", getAcceptedOrCompletedOrdersForEachSupplier);
router.get("/:id/placedorders", getPlacedOrdersForEachSupplier);
router.post("/register", registerSupplier);
router.post("/login", loginSupplier);
router.get("/:id/products", getSupplierProductsList);
router.get("/", auth, getSupplierDetails);
router.get("/all", getSupplierList);
router.get("/:id", getSupplierDetailsById);

module.exports = router;
