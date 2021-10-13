const Order = require("../models/Order.model");
const OrderProduct = require("../models/OrderProduct.model");
const Product = require("../models/Product.model");
const Site = require("../models/Site.model");
const Supplier = require("../models/Supplier.model");

//get Order List By Order Id
const getOrderProductListByOrderId = async (req, res) => {
  try {
    const orderList = await Order.findById(req.params.orderid)
      .select("productList")
      .populate({
        path: "productList",
        populate: {
          path: "product",
        },
      })
    res.json(orderList.productList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Order List By Site Id
const getOrderListBySiteId = async (req, res) => {
  try {
    const orderList = await Order.find({ site: req.params.siteid , isDraft:false})
      .populate({
        path: "productList",
        populate: {
          path: "product",
        },
      })
      .populate({
        path: "site",
      })
      .populate({
        path: "supplier",
      });
    res.json(orderList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Order List By Site Id
const getDraftOrderListBySiteId = async (req, res) => {
  try {
    const orderList = await Order.find({ site: req.params.siteid , isDraft:true})
      .populate({
        path: "productList",
        populate: {
          path: "product",
        },
      })
      .populate({
        path: "site",
      })
      .populate({
        path: "supplier",
      });
    res.json(orderList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Delivery List By Site Id
const getDeliveryListByOrderId = async (req, res) => {
  try {
    const orderList = await Order.findById(req.params.orderid)
      .populate({
        path: "deliveryList",
        populate: {
          path: "productList",
          populate: {
            path: "product",
          },
        },
      })
    res.json(orderList.deliveryList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Order details
const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: "productList",
        populate: {
          path: "product",
        },
      })
      .populate({
        path: "deliveryList",
        populate: {
          path: "productList",
          populate: {
            path: "product",
          },
        },
      })
      .populate({
        path: "deliveryList",
        populate: {
          path: "goodsReciept",
        },
      })
      .populate({
        path: "site",
      })
      .populate({
        path: "supplier",
      });
    res.json(order);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Order List
const getOrderList = async (req, res) => {
  try {
    const orderList = await Order.find()
      .populate({
        path: "productList",
        populate: {
          path: "product",
        },
      })
      .populate({
        path: "deliveryList",
        populate: {
          path: "productList",
          populate: {
            path: "product",
          },
        },
      })
      .populate({
        path: "deliveryList",
        populate: {
          path: "goodsReciept",
        },
      })
      .populate({
        path: "site",
      })
      .populate({
        path: "supplier",
      })
      .populate({
        path: "invoice",
      });

    res.json(orderList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//approve or disapprove Order by Manager
const approvedOrDisapprovedOrderByManager = async (req, res) => {
  const { approvalStatus } = req.body;
  let status = "pending";

  if (approvalStatus) {
    status = "requisition";
  }

  try {
    await Order.findByIdAndUpdate(req.params.orderid).then((existingOrder) => {
      existingOrder.approvalStatus = approvalStatus;
      existingOrder.status = status;
      existingOrder.save().then((updatedOrder) => {
        res.json(updatedOrder);
      });
    });
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//Place Order by Procurement Officer
const placedOrderByProcurementOfficer = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.orderid).then((existingOrder) => {
      existingOrder.status = "placed";
      existingOrder.save().then((updatedOrder) => {
        res.json(updatedOrder);
      });
    });
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//Accepted Order by suppiler
const acceptOrderBySuppiler = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.orderid).then((existingOrder) => {
      existingOrder.status = "accepted";
      existingOrder.save().then((updatedOrder) => {
        res.json(updatedOrder);
      });
    });
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//Unaccepted Order by suppiler
const unacceptOrderBySuppiler = async (req, res) => {
  const { comment } = req.body;
  try {
    await Order.findByIdAndUpdate(req.params.orderid).then((existingOrder) => {
      existingOrder.status = "unaccepted";
      existingOrder.comment = comment;
      existingOrder.save().then((updatedOrder) => {
        res.json(updatedOrder);
      });
    });
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//add Order by Site Manager
const addOrderBySiteManager = async (req, res) => {
  const { placedDate, requiredDate, supplier } = req.body;
  const isDraft = true;
  const approvalStatus = false;
  const isRestricted = false;
  const status = "draft";
  const totalPrice = 0;

  try {
    const order = new Order({
      isDraft,
      placedDate,
      requiredDate,
      approvalStatus,
      isRestricted,
      status,
      totalPrice,
      supplier,
      site: {
        _id: req.params.siteid,
      },
    });

    order.save().then((orderObject) => {
      Site.findByIdAndUpdate(req.params.siteid).then((existingSite) => {
        existingSite.orderList.unshift(orderObject);
        existingSite.save().then(() => {
          Supplier.findByIdAndUpdate(supplier._id).then((existingSuppiler) => {
            existingSuppiler.orderList.unshift(orderObject);
            existingSuppiler.save().then(() => {
              res.json(orderObject);
            });
          });
        });
      });
    });
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//Confirm Order by Site Manager
const comfirmOrderBySiteManager = async (req, res) => {
  try {
    let totalOrderPrice = 0;
    let restrictedStatus = false;
    let approvalStatus = true;
    let status = "requisition";

    await Order.findById(req.params.orderid).then((orderObject) => {
      orderObject.productList.map((singleOrderProduct) => {
        OrderProduct.findById(singleOrderProduct._id).then((orderProduct) => {
          totalOrderPrice = totalOrderPrice + orderProduct.opPrice;

          Product.findById(orderProduct.product._id).then((product) => {
            if (product.isRestricted) {
              restrictedStatus = true;
              status = "pending";
            }
          });
        });
      });
    });

    await Order.findByIdAndUpdate(req.params.orderid).then((existingOrder) => {
      if (totalOrderPrice > 100000 || restrictedStatus) {
        approvalStatus = false;
        status = "pending";
      }

      existingOrder.approvalStatus = approvalStatus;
      existingOrder.totalPrice = totalOrderPrice;
      existingOrder.status = status;
      existingOrder.isDraft = false;
      existingOrder.save().then((updatedOrder) => {
        res.json(updatedOrder);
      });
    });
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//Update product price in Order by Supplier
const updateProductPriceInOrderBySupplier = async (req, res) => {
  const { newPrice } = req.body;
  try {
    await OrderProduct.findByIdAndUpdate(req.params.orderproductid).then(
      (existingOrderProduct) => {
        existingOrderProduct.opPrice = newPrice * existingOrderProduct.qty;
        existingOrderProduct.save();
      }
    );

    await Order.findByIdAndUpdate(req.params.orderid).then(
      async (existingOrder) => {
        let newTotalPrice = 0;
        existingOrder.productList.forEach((singleOrderProduct) => {
          OrderProduct.findById(singleOrderProduct._id).then((orderProduct) => {
            newTotalPrice = newTotalPrice + orderProduct.opPrice;
            existingOrder.totalPrice = newTotalPrice;
          });
        });
        await existingOrder.save().then((updatedOrder) => {
          res.json(updatedOrder);
        });
      }
    );
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//Closed Order after delivery completed by site manager
const closeOrderAfterDeliveryCompletedBySiteManager = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.orderid).then(
      async (existingOrder) => {
        existingOrder.status = "completed";
        await existingOrder.save().then((updatedOrder) => {
          res.json(updatedOrder);
        });
      }
    );
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  getOrderDetails,
  getOrderList,
  addOrderBySiteManager,
  comfirmOrderBySiteManager,
  approvedOrDisapprovedOrderByManager,
  placedOrderByProcurementOfficer,
  acceptOrderBySuppiler,
  unacceptOrderBySuppiler,
  updateProductPriceInOrderBySupplier,
  closeOrderAfterDeliveryCompletedBySiteManager,
  getOrderListBySiteId,
  getOrderProductListByOrderId,
  getDeliveryListByOrderId,
  getDraftOrderListBySiteId
};
