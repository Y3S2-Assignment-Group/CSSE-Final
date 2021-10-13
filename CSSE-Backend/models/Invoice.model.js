const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({

  bank: {
    type: String,
  },
  branch: {
    type: String,
  },
  accNumber: {
    type: String,
  },
  submittedDate: {
    type: Date,
  },
  totalAmount: {
    type: Number,
  },
  paidStatus: {
    type: Boolean,
  },
});

module.exports = Invoice = mongoose.model("Invoice", InvoiceSchema);
