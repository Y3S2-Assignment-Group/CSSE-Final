const Site = require("../models/Site.model");
const SiteManager = require("../models/SiteManager.model");

//Insert Site to the system
const addSite = async (req, res) => {
  const { siteName, siteAddress, siteContactNumber, siteManager } = req.body;

  try {
    //create a user instance
    const site = new Site({
      siteName,
      siteAddress,
      siteContactNumber,
      siteManager,
    });

    //save user to the database
    await site
      .save()
      .then(async (insertedSite) => {
        const siteManager = await SiteManager.findById(insertedSite.siteManager._id);
        siteManager.siteList.unshift(insertedSite);
        await siteManager.save().then(() => {
          res.json(insertedSite);
        });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//get site by Id
const getSiteById = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id)
      .populate({
        path: "orderList",
        populate: {
          path: "productList",
          populate: {
            path: "product",
          },
        },
      })
      .populate({
        path: "orderList",
        populate: {
          path: "invoice",
        },
      })
      .populate({
        path: "orderList",
        populate: {
          path: "deliveryList",
          populate: {
            path: "productList",
            populate: {
              path: "product",
            },
          },
        },
      })
      .populate({
        path: "orderList",
        populate: {
          path: "deliveryList",
          populate: {
            path: "goodsReciept",
          },
        },
      })
      .populate({
        path: "siteManager",
        model: "SiteManager",
      });
    res.json(site);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get all sites
const getSiteList = async (req, res) => {
  try {
    const Sites = await Site.find()
      .populate({
        path: "orderList",
        populate: {
          path: "productList",
          populate: {
            path: "product",
          },
        },
      })
      .populate({
        path: "orderList",
        populate: {
          path: "invoice",
        },
      })
      .populate({
        path: "orderList",
        populate: {
          path: "deliveryList",
          populate: {
            path: "productList",
            populate: {
              path: "product",
            },
          },
        },
      })
      .populate({
        path: "orderList",
        populate: {
          path: "deliveryList",
          populate: {
            path: "goodsReciept",
          },
        },
      })
      .populate({
        path: "siteManager",
        model: "SiteManager",
      });
    res.json(Sites);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addSite,
  getSiteById,
  getSiteList,
};
