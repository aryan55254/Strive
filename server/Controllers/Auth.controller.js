const User = require("../Models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;
const {
  generateandsettoken,
  generateaccesstoken,
  verifyjwt,
} = require("../Utils/jwt.utility");
//register controller

const register = async (req, res, next) => {
  try {
    const { Email, Username, Password } = req.body;
    if (!Email || !Username || !Password) {
      return res
        .status(400)
        .json({ message: "All Credentals Are Required To Be Filled" });
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

//login controller

const login = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res
        .status(400)
        .json({ message: "All Credentials Are Required To Be Filled" });
    }
    const findemail = await User.findOne({ Email: Email });
    if (!findemail) {
      return res.status(404).json({ message: "User Doesn't Exist" });
    }
    const matchpassword = await bcrypt.compare(Password, findemail.Password);
    if (!matchpassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const accesstoken = generateandsettoken(res, findemail._id);
    const { Password: _, ...userData } = findemail.toObject();
    return res.status(200).json({
      message: "Login successful",
      accesstoken: accesstoken,
      userData: userData,
    });
  } catch (err) {
    next(err);
  }
};

//refresh controller

const refresh = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(404).json({ message: "Refresh Token Not Found" });
    }
    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      }
      const user = await User.findById(decoded.userid);
      if (!user) {
        return res.status(403).json({ message: "Forbidden: User not found" });
      }
      const newAccessToken = await generateaccesstoken(user._id);
      return res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, refresh };
