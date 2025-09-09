const User = require("../Models/User.model");
const ratelimit = process.env.GEN_LIMIT;
const today = new Date();
const rateLimiter = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const userdata = await User.findById(userid).select("-Password");
    const dbdate = userdata.lastGenerationDate;
    if (dbdate != today) {
      userdata({ lastGeneratationDate: today });
    }
    if (userdata.generationCount >= ratelimit) {
      return res.status(429).status({ message: "Generation Limit Reached" });
    }
    if (userdata.generationCount < ratelimit) {
      userdata.generationCount++;
    }
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = rateLimiter;
