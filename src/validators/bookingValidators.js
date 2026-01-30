function validateCreateBooking(req) {
  const { roomId, startTime, endTime } = req.body;

  if (!roomId) return "roomId is required";
  if (!startTime) return "startTime is required";
  if (!endTime) return "endTime is required";

  if (typeof roomId !== "string") return "roomId must be a string";
  if (typeof startTime !== "string") return "startTime must be a string";
  if (typeof endTime !== "string") return "endTime must be a string";

  return null;
}

function validateCancelBooking(req) {
  const { bookingId } = req.params;

  if (!bookingId) return "bookingId is required";
  if (typeof bookingId !== "string") return "bookingId must be a string";

  return null;
}

export { 
  validateCreateBooking, 
  validateCancelBooking 
};