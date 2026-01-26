const AppError = require("../utils/AppError");
const ERROR_CODES = require("../utils/errorCodes");
const {
  createBooking,
  cancelBooking
} = require("../services/bookingService");

function createBookingHandler(req, res, next) {
  const { roomId, startTime, endTime } = req.body;

  if (!roomId || !startTime || !endTime) {
    return next(new AppError(ERROR_CODES.BAD_REQUEST, 400));
  }

  const result = createBooking({
    roomId,
    startTime,
    endTime,
    userId: req.userId
  });

  if (result.error) {
    return next(new AppError(result.error, result.status));
  }

  res.status(201).json(result.booking);
}

function cancelBookingHandler(req, res, next) {
  const { bookingId } = req.params;

  if (!bookingId) {
    return next(new AppError(ERROR_CODES.BAD_REQUEST, 400));
  }

  const result = cancelBooking({
    bookingId,
    userId: req.userId
  });

  if (result.error) {
    return next(new AppError(result.error, result.status));
  }

  res.status(200).json({ message: "Booking cancelled successfully" });
}

module.exports = {
  createBookingHandler,
  cancelBookingHandler
};
