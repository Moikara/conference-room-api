const AppError = require("../utils/AppError");
const ERROR_CODES = require("../utils/errorCodes");

/**
 * validators: array of functions (req) => string | null
 */
function validateRequest(validators) {
  return (req, res, next) => {
    for (const validate of validators) {
      const errorMessage = validate(req);
      if (errorMessage) {
        return next(
          new AppError(
            {
              code: ERROR_CODES.BAD_REQUEST.code,
              message: errorMessage
            },
            400
          )
        );
      }
    }
    next();
  };
}

module.exports = validateRequest;
