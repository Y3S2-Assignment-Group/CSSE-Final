const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SiteSchema = new Schema({
  siteName: {
    type: String,
  },
  siteAddress: {
    type: String,
  },
  siteContactNumber: {
    type: String,
  },

  orderList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  siteManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SiteManager",
  },
});

module.exports = Site = mongoose.model("Site", SiteSchema);
