import AppError from "../utils/AppError.js";
import { getRoomBookings } from "../services/bookingService.js";

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

export default getRoomBookingsHandler;