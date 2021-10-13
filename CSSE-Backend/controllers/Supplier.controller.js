const bcrypt = require("bcryptjs");
const Supplier = require("../models/Supplier.model");
const jwt = require("jsonwebtoken");
const config = require("config");



//get Supplier details
const getSupplierProductsList = async (req, res) => {
  try {
    //get user details
    //-password : dont return the pasword
    const user = await Supplier.findById(req.params.id)
    .select("productList")
    .populate({
      path: "productList",
      match: { deleteStatus: false },
      select: "ProductName pPrice",
    });
    res.json(user.productList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};


//get Supplier details by id
const getSupplierDetailsById = async (req, res) => {
  try {
    //get user details
    //-password : dont return the pasword
    const user = await Supplier.findById(req.params.id)
    .select("-password")
    .populate({
      path: "orderList",
      populate: {
        path: "productList",
        populate: {
          path: "product",
        },
      },
    })
    .populate({
      path: "orderList",
      populate: {
        path: "deliveryList",
        populate: {
          path: "productList",
          populate: {
            path: "product",
          },
        },
      },
    })
    .populate({
      path: "orderList",
      populate: {
        path: "deliveryList",
        populate: {
          path: "goodsReciept",
        },
      },
    })
    .populate({
      path: "orderList",
      populate: {
        path: "invoice"
      },
    })
    .populate({
      path: "orderList",
      populate: {
        path: "supplier"
      },
    })
    .populate({
      path: "orderList",
      populate: {
        path: "site"
      },
    })
    .populate({
      path: "productList",
    });
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Supplier details
const getSupplierDetails = async (req, res) => {
  try {
    //get user details
    //-password : dont return the pasword
    const user = await Supplier.findById(req.user.id)
    .select("-password")
    .populate({
      path: "orderList",
      populate: {
        path: "productList",
        populate: {
          path: "product",
        },
      },
    })
    .populate({
      path: "orderList",
      populate: {
        path: "deliveryList",
        populate: {
          path: "productList",
          populate: {
            path: "product",
          },
        },
      },
    })
    .populate({
      path: "orderList",
      populate: {
        path: "deliveryList",
        populate: {
          path: "goodsReciept",
        },
      },
    })
    .populate({
      path: "orderList",
      populate: {
        path: "invoice"
      },
    })
    .populate({
      path: "orderList",
      populate: {
        path: "supplier"
      },
    })
    .populate({
      path: "orderList",
      populate: {
        path: "site"
      },
    })
    .populate({
      path: "productList",
    });
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//Get Placed Orders For Each Supplier
const getPlacedOrdersForEachSupplier = async (req, res) => {
  try {
    const user = await Supplier.findById(req.params.id)
      .select("orderList")
      .populate({
        path: "orderList",
        match: { status: "placed" }, //filter status: "placed"
        populate: {
          path: "productList",
          populate: {
            path: "product",
          },
        },
      });
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//Accepted Orders or Completed Orders For Each Supplier
const getAcceptedOrCompletedOrdersForEachSupplier = async (req, res) => {
  try {
    const user = await Supplier.findById(req.params.id)
      .select("orderList")
      .populate({
        path: "orderList",
        match: { status: "accepted" || "completed" }, //filter status: "placed"
        populate: {
          path: "productList",
          populate: {
            path: "product",
          },
        },
      });
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Product List
const getSupplierList = async (req, res) => {
  try {
    const supplierList = await Supplier.find()
      .populate({
        path: "orderList",
        populate: {
          path: "productList",
          populate: {
            path: "product",
          },
        },
      })
      .populate({
        path: "orderList",
        populate: {
          path: "deliveryList",
          populate: {
            path: "productList",
            populate: {
              path: "product",
            },
          },
        },
      })
      .populate({
        path: "orderList",
        populate: {
          path: "deliveryList",
          populate: {
            path: "goodsReciept",
          },
        },
      })
      .populate({
        path: "productList",
      });
      res.json(supplierList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//Authenticate Supplier and get token
const loginSupplier = async (req, res) => {
  const { email, password } = req.body;

  try {
    //See if user Exist
    let user = await Supplier.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    //match the user email and password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    //Return jsonwebtoken

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

//Register Supplier
const registerSupplier = async (req, res) => {
  const { name, email, password, address, contactNumber } = req.body;

  try {
    //See if user Exist
    let user = await Supplier.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Supplier already exist" }] });
    }

    //create a Supplier instance
    user = new Supplier({
      name,
      email,
      password,
      address,
      contactNumber,
    });

    //Encrypt Password

    //10 is enogh..if you want more secured.user a value more than 10
    const salt = await bcrypt.genSalt(10);

    //hashing password
    user.password = await bcrypt.hash(password, salt);

    //save user to the database
    await user.save();

    //Return jsonwebtoken

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  getSupplierList,
  getSupplierDetails,
  loginSupplier,
  registerSupplier,
  getPlacedOrdersForEachSupplier,
  getAcceptedOrCompletedOrdersForEachSupplier,
  getSupplierProductsList,
  getSupplierDetailsById
};
