const ErrorHandler = require("../utils/errorHandler");

const errorMiddlewaree = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      Message: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    //handling mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400); //bad request
    }

    if (err.name === "CastError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400); //bad request
    }

    res.status(error.statusCode).json({
      success: false,
      Message: error.message || "internal server error",
    });
  }
};

module.exports = errorMiddlewaree;
