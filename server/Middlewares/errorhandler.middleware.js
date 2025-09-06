const errorhandler = async (err, req, res, next) => {
  return res
    .status(500)
    .json({ message: `Internal Server Error Occured : ${err}` });
};

module.exports = errorhandler;
