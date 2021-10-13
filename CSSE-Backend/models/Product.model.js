const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({

  ProductName: {
    type: String,
  },
  pPrice: {
    type: Number,
  },
  isRestricted: {
    type: Boolean,
  },
  deleteStatus: {
    type: Boolean,
  },
}); 

module.exports = Product = mongoose.model("Product", ProductSchema);
