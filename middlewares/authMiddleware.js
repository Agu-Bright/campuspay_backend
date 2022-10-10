const jwt = require("jsonwebtoken");
const User = require("../model/authModel");
const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

const authMiddleware = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Login to perform this operation", 401));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decode.id);
  next();
});

//handle user role
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

module.exports = { authMiddleware, authorizeRoles };
