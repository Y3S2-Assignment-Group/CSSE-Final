const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  isDraft: {
    type: Boolean,
  },
  productList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderProduct",
    },
  ],
  deliveryList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
    },
  ],
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
  },
  placedDate: {
    type: String,
  },
  requiredDate: {
    type: String,
  },
  approvalStatus: {
    type: Boolean,
  },
  comment: {
    type: String,
  },
  status: {
    type: String,
  },
  totalPrice: {
    type: Number,
  },
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice",
  },
});

module.exports = Order = mongoose.model("Order", OrderSchema);
