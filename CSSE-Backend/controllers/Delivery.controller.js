const Delivery = require("../models/Delivery.model");
const GoodsReciept = require("../models/GoodsReciept.model");
const Order = require("../models/Order.model");

//Accept Delivery By SiteManager
const acceptDeliveryBySiteManager = async (req, res) => {
  try {
    Delivery.findByIdAndUpdate(req.params.id).then((existingDelivery)=>{
      existingDelivery.isAccepted = true;
      existingDelivery.save().then((updatedDelivery)=>{
        res.json(updatedDelivery)
      })
    })
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//add Delivery By Supplier
const addDelivery = async (req, res) => {
  try {
    //create a product instance
    const delivery = new Delivery({
      isAccepted: false,
    });

    //save product to the database
    await delivery
      .save()
      .then(async (createdDelivery) => {
        Order.findByIdAndUpdate(req.params.orderid).then((existingOrder) => {
          existingOrder.deliveryList.push(createdDelivery);
          existingOrder.save().then(() => {
            res.json(createdDelivery);
          });
        });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//add goodsReciept to delivery
const addCreateGoodsReciept = async (req, res) => {
  const { orderID, deliveryID } = req.body;

  try {
    const delivery = await Delivery.findById(deliveryID).populate({
      path: "productList",
      model: "OrderProduct",
    });
    var totDeliveryPrice = 0;
    await delivery.productList.forEach((element) => {
      totDeliveryPrice = totDeliveryPrice + element.opPrice;
    });

    const goodsReciept = new GoodsReciept({
      orderReference: orderID,
      price: totDeliveryPrice,
    });
    console.log(totDeliveryPrice)
    await goodsReciept
      .save()
      .then(async (createdgoodsReciept) => {
        Delivery.findByIdAndUpdate(deliveryID).then((existingDelivery) => {
          existingDelivery.goodsReciept = createdgoodsReciept;
          existingDelivery.save().then((updatedDelivery) => {
            res.json(updatedDelivery);
          });
        });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};
module.exports = {
  addDelivery,
  addCreateGoodsReciept,
  acceptDeliveryBySiteManager
};
