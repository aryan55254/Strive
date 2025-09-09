const User = require("../Models/User.model");
require("dotenv").config();
const SECRETKEY = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const authmiddleware = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    return res.status(401).json({
      message: "Unauthorized: No token provided or Wrong Token Provided",
    });
  }
  try {
    const decoded = jwt.verify(token, SECRETKEY);

    const userid = decoded.userid;
    const user = await User.findById(userid, "_id Email Username");

    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid or expired token" });
    }
    next(err);
  }
};

module.exports = authmiddleware;
