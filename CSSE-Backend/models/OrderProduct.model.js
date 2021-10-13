const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderProductSchema = new Schema({

  qty: {
    type: Number,
  },
  opPrice: {
    type: Number,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = OrderProduct = mongoose.model(
  "OrderProduct",
  OrderProductSchema
);
