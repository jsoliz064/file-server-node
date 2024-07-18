const validateFileUpload = (req, res, next) => {
  if (!req.files) {
    return res.status(400).json({ message: "file not found" });
  }
  next();
};

module.exports = {
  validateFileUpload,
};
