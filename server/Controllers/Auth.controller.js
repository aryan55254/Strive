const User = require("../Models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;
const {
  generateandsettoken,
  generateaccesstoken,
  cleartoken,
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

    console.time("Refresh:TokenVerify");
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });
    console.timeEnd("Refresh:TokenVerify");

    console.time("Refresh:DbQuery");
    const user = await User.findById(decoded.userid).select(
      "-Password -lastGenerationDate"
    );
    console.timeEnd("Refresh:DbQuery");

    if (!user) {
      return res.status(403).json({ message: "Forbidden: User not found" });
    }
    const newAccessToken = generateaccesstoken(user._id);
    return res
      .status(200)
      .json({ accessToken: newAccessToken, userData: user });
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
         return res.status(403).json({ message: "Invalid Token" });
    }
    next(err);
  }
};

//logout controller

const logout = async (req, res, next) => {
  try {
    cleartoken(res);
    return res
      .status(200)
      .json({ message: "Succesfully Logged Out Of the session " });
  } catch (err) {
    next(err);
  }
};

//getuser controller

const getuser = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const UserData = await User.findById(userid).select(
      "-Password -lastGenerationDate"
    );
    if (!UserData) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json(UserData);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, refresh, logout, getuser };
