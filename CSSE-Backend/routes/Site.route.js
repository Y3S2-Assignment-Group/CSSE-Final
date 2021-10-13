const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addSite,
  getSiteById,
  getSiteList,
} = require("../controllers/Site.controller");

router.post("/", addSite);
router.get("/", getSiteList);
router.get("/:id", getSiteById);


module.exports = router;
