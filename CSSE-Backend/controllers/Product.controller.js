const Product = require("../models/Product.model");
const Supplier = require("../models/Supplier.model");

//get Product details
const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Product List
const getProductList = async (req, res) => {
  try {
    const productList = await Product.find();
    res.json(productList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//add Product By Procurement Officer
const addProductByProcurementOfficer = async (req, res) => {
  const { ProductName, pPrice, isRestricted, supplierId } = req.body;
  
  let productPrice = 0;
  if(pPrice){
    productPrice = pPrice
  }

  try {
    //create a product instance
    const product = new Product({
      ProductName,
      pPrice:productPrice,
      isRestricted,
      deleteStatus: false,
    });

    //save product to the database
    await product
      .save()
      .then(async (createdProduct) => {
        const supplier = await Supplier.findById(supplierId);
        supplier.productList.unshift(createdProduct);
        await supplier.save();
        res.json(createdProduct);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//delete flight status
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product != null) {
      Product.findByIdAndUpdate(req.params.id).then(async (existingProduct) => {
        existingProduct.pPrice = req.body.pPrice;
        existingProduct
          .save()
          .then((response) => res.json(response))
          .catch((err) => res.status(400).json("Error: " + err));
      });
    }
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

//Delete Product
const deleteIssue = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product != null) {
      Product.findByIdAndUpdate(req.params.id).then(async (existingProduct) => {
        existingProduct.deleteStatus = true;

        existingProduct
          .save()
          .then((response) => res.json(response))
          .catch((err) => res.status(400).json("Error: " + err));
      });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getProductDetails,
  getProductList,
  addProductByProcurementOfficer,
  updateProduct,
  deleteIssue,
};
