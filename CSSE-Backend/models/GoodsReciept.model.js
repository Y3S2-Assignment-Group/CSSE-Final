const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoodsRecieptSchema = new Schema({
  price: {
    type: Number,
  },
  orderReference: {
    type: String,
  },
});

module.exports = GoodsReciept = mongoose.model(
  "GoodsReciept",
  GoodsRecieptSchema
);
