const AppError = require("../utils/AppError");
const { getRoomBookings } = require("../services/bookingService");

function getRoomBookingsHandler(req, res, next) {
  const { roomId } = req.params;

  const result = getRoomBookings({
    roomId,
    userId: req.userId
  });

  if (result.error) {
    return next(new AppError(result.error, result.status));
  }

  res.status(200).json(result);
}

module.exports = {
  getRoomBookingsHandler
};
