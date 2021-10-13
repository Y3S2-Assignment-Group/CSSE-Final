const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getSiteManagerDetails, loginSiteManager, registerSiteManager, getAllSiteManagers,getSiteManagerSiteList,getOrderListOfSiteManager
} = require("../controllers/SiteManager.controller");


router.post("/register", registerSiteManager);
router.post("/login", loginSiteManager);
router.get("/orders", auth, getOrderListOfSiteManager);
router.get("/", auth, getSiteManagerDetails);
router.get("/all", getAllSiteManagers);
router.get("/sites",auth, getSiteManagerSiteList);

module.exports = router;
