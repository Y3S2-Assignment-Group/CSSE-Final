const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountingOfficerSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

module.exports = AccountingOfficer = mongoose.model("AccountingOfficer", AccountingOfficerSchema);
