const AppError = require("../utils/AppError");
const ERROR_CODES = require("../utils/errorCodes");

function requireUser(req, res, next) {
  const userId = req.header("X-User-Id");

  if (!userId) {
    return next(new AppError(ERROR_CODES.AUTH_REQUIRED, 401));
  }

  req.userId = userId;
  next();
}

module.exports = requireUser;
