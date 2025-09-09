const User = require("../Models/User.model");
const ratelimit = process.env.GEN_LIMIT;
const rateLimiter = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const userdata = await User.findById(userid).select("-Password");
    if (!userdata) {
      return res.status(401).json({ message: "User Not Found" });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let lastGenDate = userdata.lastGenerationDate;
    if (lastGenDate) {
      lastGenDate.setHours(0, 0, 0, 0);
    }

    if (!lastGenDate || lastGenDate.getTime() < today.getTime()) {
      userdata.generationCount = 0;
      userdata.lastGenerationDate = new Date();
    }

    if (userdata.generationCount >= ratelimit) {
      return res.status(429).json({ message: "Generation Limit Reached" });
    }
    userdata.generationCount++;
    await userdata.save();
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = rateLimiter;
