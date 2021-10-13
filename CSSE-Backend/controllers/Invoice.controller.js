const Invoice = require("../models/Invoice.model");
const Order = require("../models/Order.model");

//add Product By Procurement Officer
const addInvoice = async (req, res) => {
  const { bank, branch, accNumber, submittedDate, orderReference } = req.body;

  const order = await Order.findById(orderReference);

  try {
    //create a product instance
    const invoice = new Invoice({
      bank,
      branch,
      accNumber,
      submittedDate,
      totalAmount: order.totalPrice,
      paidStatus: false,
    });

    //save product to the database
    await invoice
      .save()
      .then(async (createdInvoice) => {
        // order.deliveryList.unshift(createdInvoice);
        Order.findByIdAndUpdate(orderReference).then((existingOrder) => {
          existingOrder.invoice = createdInvoice;
          existingOrder.status = "invoicesubmitted";
          existingOrder.save().then(() => {
            res.json(createdInvoice);
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

//change paid status
const updateInvoicePaymentStatus = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (invoice != null) {
      await Invoice
        .findByIdAndUpdate(req.params.id)
        .then(async (existingInvoice) => {
          existingInvoice.paidStatus = true;
          existingInvoice
            .save()
            .then((response) => {
              Order.findByIdAndUpdate(req.params.orderid).then(
                (existingOrder) => {
                  existingOrder.status = "paid";
                  existingOrder.save().then(() => {
                    res.json(response);
                  });
                }
              );
            })
            .catch((err) => res.status(400).json("Error: " + err));
        });
    }
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  addInvoice,
  updateInvoicePaymentStatus,
};
