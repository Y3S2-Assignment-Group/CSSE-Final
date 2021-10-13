const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

//Using Cors
app.use(cors());

//Init Middleware( include  bodyparser through express)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("CSSE Backend Api Running"));


//Define Routes

//-------------------Delivery---------------------
app.use("/api/delivery", require("./routes/Delivery.route"));

//-------------------Site ---------------------
app.use("/api/site", require("./routes/Site.route"));

//-------------------Site Manager---------------------
app.use("/api/sitemanager", require("./routes/SiteManager.route"));

//-------------------Manager---------------------
app.use("/api/manager", require("./routes/Manager.route"));

//-------------------Accounting Officer---------------------
app.use("/api/accountingofficer", require("./routes/AccountingOfficer.route"));

//-------------------Procurement Officer---------------------
app.use("/api/procurementofficer", require("./routes/ProcurementOfficer.route"));

//-------------------Supplier Officer---------------------
app.use("/api/supplier", require("./routes/Supplier.route"));

//-------------------Product---------------------
app.use("/api/product", require("./routes/Product.route"));

//-------------------Order---------------------
app.use("/api/order", require("./routes/Order.route"));

//-------------------Order Products---------------------
app.use("/api/orderproduct", require("./routes/OrderProduct.route"));

//-------------------Invoice Products---------------------
app.use("/api/invoice", require("./routes/Invoice.route"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
