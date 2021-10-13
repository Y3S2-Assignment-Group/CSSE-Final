const Order = require("../models/Order.model");
const Delivery = require("../models/Delivery.model");
const OrderProduct = require("../models/OrderProduct.model");
const Product = require("../models/Product.model");

//get Order Products details
const getOrderProductsDetails = async (req, res) => {
  try {
    const orderProduct = await OrderProduct.findById(req.params.id);
    res.json(orderProduct);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Order Products List
const getOrderProductsList = async (req, res) => {
  try {
    const orderProductList = await OrderProduct.find();
    res.json(orderProductList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//add Order Products To Order
const addOrderProductsToOrder = async (req, res) => {
  const { product, qty } = req.body;

  try {
    let opPrice = 0;
    await Product.findById(product).then((existingProduct) => {
      opPrice = existingProduct.pPrice * qty;
      console.log(existingProduct.pPrice);
    });

    const orderProduct = new OrderProduct({
      product,
      qty,
      opPrice,
    });

    orderProduct.save().then((orderObject) => {
      Order.findByIdAndUpdate(req.params.id).then((existingOrder) => {
        existingOrder.productList.unshift(orderObject);
        existingOrder.save().then(() => {
          res.json(orderObject);
        });
      });
    });
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//add Order Products To delivery
const addOrderProductsToDelivery = async (req, res) => {
  const { product, qty } = req.body;

  try {
    let opPrice = 0;
    await Product.findById(product).then((existingProduct) => {
      opPrice = existingProduct.pPrice * qty;
      console.log(existingProduct.pPrice);
    });

    const orderProduct = new OrderProduct({
      approvalStatus: true,
      product,
      qty,
      opPrice,
    });

    orderProduct.save().then((orderObject) => {
      Delivery.findByIdAndUpdate(req.params.id).then((existingdelivery) => {
        existingdelivery.productList.unshift(orderObject);
        existingdelivery.save().then(() => {
          res.json(orderObject);
        });
      });
    });
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};
module.exports = {
  getOrderProductsDetails,
  getOrderProductsList,
  addOrderProductsToOrder,
  addOrderProductsToDelivery,
};
