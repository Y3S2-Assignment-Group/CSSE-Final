const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeliverySchema = new Schema({

  productList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderProduct",
    },
  ], 
  goodsReciept: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GoodsReciept",
    },
  
  isAccepted: {
    type: Boolean,
  },

});

module.exports = Delivery = mongoose.model("Delivery", DeliverySchema);
