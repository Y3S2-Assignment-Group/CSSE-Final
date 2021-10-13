const express = require("express");
const router = express.Router();

const {
  getProductDetails,
  getProductList,
  addProductByProcurementOfficer,
  deleteIssue,
  updateProduct
} = require("../controllers/Product.controller");

router.get("/:id", getProductDetails);
router.put("/:id", updateProduct);
router.post("/delete/:id", deleteIssue);
router.get("/", getProductList);
router.post("/", addProductByProcurementOfficer);

module.exports = router;
