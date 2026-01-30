import AppError from "../utils/AppError.js";
import ERROR_CODES from "../utils/errorCodes.js";

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

export default validateRequest;