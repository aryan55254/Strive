const jwt = require("jsonwebtoken");
const SecretKey = process.env.JWT_SECRET;

const generateandsettoken = (res, userid) => {
  const accesstoken = jwt.sign({ userid }, SecretKey, { expiresIn: "15m" });
  const refreshtoken = jwt.sign({ userid }, SecretKey, { expiresIn: "7d" });
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("jwt", refreshtoken, {
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
    domain: isProduction ? ".aryanmishra.site" : undefined,
  });
  return accesstoken;
};

const generateaccesstoken = (userid) => {
  const accesstoken = jwt.sign({ userid }, SecretKey, { expiresIn: "15m" });
  return accesstoken;
};

const cleartoken = (res) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("jwt", "", {
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    httpOnly: true,
    expires: new Date(0),
    path: "/",
    domain: isProduction ? ".aryanmishra.site" : undefined,
  });
};

module.exports = { generateandsettoken, generateaccesstoken, cleartoken };
