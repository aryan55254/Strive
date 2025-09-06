const User = require("../Models/User.model");
const bcrypt = require("bcrypt");
//register controller

const register = async (req, res, next) => {
  try {
    const { Email, Username, Password } = req.body;
    if (!Email || !Username || !Password) {
      return res
        .status(400)
        .json({ message: "All Credentals Are Required To B e Filled" });
    }
    const matchingemail = await User.findOne({ Email: Email });
    if (matchingemail) {
      return res
        .status(400)
        .json({ message: "User With This Email Already Exists" });
    }
    const hashedpassword = await bcrypt.hash(Password, 10);
    const newuser = new User({
      Email: Email,
      Username: Username,
      Password: hashedpassword,
    });
    await newuser.save();
    return res.status(201).json({ message: "User Succesfully Registered" });
  } catch (err) {
    next(err);
  }
};

module.exports = { register };
