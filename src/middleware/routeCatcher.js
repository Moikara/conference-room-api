import AppError from "../utils/AppError.js";
import ERROR_CODES from "../utils/errorCodes.js";

function routeCatcher(req, res, next) {
    next(new AppError(ERROR_CODES.INVALID_PATH, 404));
}

export default routeCatcher;