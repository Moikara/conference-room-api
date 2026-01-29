const ERROR_CODES = {
  AUTH_REQUIRED: {
    code: "AUTH_REQUIRED",
    message: "Authentication required"
  },

  ROOM_NOT_FOUND: {
    code: "ROOM_NOT_FOUND",
    message: "Room does not exist"
  },

  INVALID_TIME_FORMAT: {
    code: "INVALID_TIME_FORMAT",
    message: "Time must be in YYYY-MM-DD HH:mm format"
  },

  START_TIME_IN_PAST: {
    code: "START_TIME_IN_PAST",
    message: "Start time cannot be in the past"
  },

  START_AFTER_END: {
    code: "START_AFTER_END",
    message: "Start time must be before end time"
  },

  CROSS_DAY_BOOKING: {
    code: "CROSS_DAY_BOOKING",
    message: "Booking must start and end on the same day"
  },

  BOOKING_TIME_OVERLAP: {
    code: "BOOKING_TIME_OVERLAP",
    message: "The selected time overlaps with an existing booking"
  },

  BOOKING_NOT_FOUND: {
    code: "BOOKING_NOT_FOUND",
    message: "Booking not found"
  },

  BOOKING_ALREADY_STARTED: {
    code: "BOOKING_ALREADY_STARTED",
    message: "Booking has already started and cannot be cancelled"
  },

  FORBIDDEN: {
    code: "FORBIDDEN",
    message: "You are not allowed to perform this action"
  },

  INVALID_PATH: {
    code: "INVALID_PATH",
    message: "Requested path does not exist"
  },

  BAD_REQUEST: {
    code: "BAD_REQUEST",
    message: "Invalid request"
  }
};

module.exports = ERROR_CODES;
