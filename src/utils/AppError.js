class AppError extends Error {
  constructor(errorCode, statusCode) {
    super(errorCode.message);
    this.statusCode = statusCode;
    this.code = errorCode.code;
    this.isOperational = true;
  }
}

export default AppError;