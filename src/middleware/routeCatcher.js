const AppError = require("../utils/AppError");
const ERROR_CODES = require("../utils/errorCodes");

function routeCatcher(req, res, next) {
    next(new AppError(ERROR_CODES.INVALID_PATH, 404));    
}

module.exports = routeCatcher;