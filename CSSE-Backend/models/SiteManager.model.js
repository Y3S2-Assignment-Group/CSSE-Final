const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SiteManagerSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  siteList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
    },
  ],
});

module.exports = SiteManager = mongoose.model("SiteManager", SiteManagerSchema);
