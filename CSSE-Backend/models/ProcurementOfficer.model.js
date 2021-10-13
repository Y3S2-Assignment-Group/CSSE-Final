const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProcurementOfficerSchema = new Schema({
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

module.exports = ProcurementOfficer = mongoose.model("ProcurementOfficer", ProcurementOfficerSchema);
