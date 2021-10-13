const bcrypt = require("bcryptjs");
const AccountingOfficer = require("../models/AccountingOfficer.model");
const jwt = require("jsonwebtoken");
const config = require("config");

//get AccountingOfficer details
const getAccountingOfficerDetails = async (req, res) => {
  try {
    //get user details
    //-password : dont return the pasword
    const user = await AccountingOfficer.findById(req.user.id).select("-password");
    res.json(user);
  } catch {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//Authenticate AccountingOfficer and get token
const loginAccountingOfficer = async (req, res) => {
  const { email, password } = req.body;

  try {
    //See if user Exist
    let user = await AccountingOfficer.findOne({ email });

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

//Register AccountingOfficer
const registerAccountingOfficer = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    //See if user Exist
    let user = await AccountingOfficer.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "AccountingOfficer already exist" }] });
    }

    //create a AccountingOfficer instance
    user = new AccountingOfficer({
      name,
      email,
      password,
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

module.exports = { getAccountingOfficerDetails, loginAccountingOfficer, registerAccountingOfficer };
