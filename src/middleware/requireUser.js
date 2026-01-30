import AppError from "../utils/AppError.js";
import ERROR_CODES from "../utils/errorCodes.js";

function requireUser(req, res, next) {
  const userId = req.header("X-User-Id");

  if (!userId) {
    return next(new AppError(ERROR_CODES.AUTH_REQUIRED, 401));
  }

  req.userId = userId;
  next();
}

export default requireUser;