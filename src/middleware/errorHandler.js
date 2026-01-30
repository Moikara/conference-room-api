function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  if (!err.isOperational) {
    console.error(err);
    return res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Internal server error"
      }
    });
  }

  res.status(statusCode).json({
    error: {
      code: err.code,
      message: err.message
    }
  });
}

export default errorHandler;