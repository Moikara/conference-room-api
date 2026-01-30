import bookingsByRoom from "../models/bookingModel.js";
import getRoomById from "../models/roomModel.js";
import { parseDateTime, isSameDay, isInPast, overlaps } from "../utils/timeUtils.js";
import ERROR_CODES from "../utils/errorCodes.js";

let bookingCounter = 1;

function createBooking({ roomId, startTime, endTime, userId }) {
  const room = getRoomById(roomId);
  if (!room) {
    return { error: ERROR_CODES.ROOM_NOT_FOUND, status: 404 };
  }

  const start = parseDateTime(startTime);
  const end = parseDateTime(endTime);

  if (!start || !end) {
    return { error: ERROR_CODES.INVALID_TIME_FORMAT, status: 400 };
  }

  if (isInPast(start)) {
    return { error: ERROR_CODES.START_TIME_IN_PAST, status: 422 };
  }

  if (start >= end) {
    return { error: ERROR_CODES.START_AFTER_END, status: 422 };
  }

  if (!isSameDay(start, end)) {
    return { error: ERROR_CODES.CROSS_DAY_BOOKING, status: 422 };
  }

  const existingBookings = bookingsByRoom.get(roomId) || [];
  for (const booking of existingBookings) {
    if (overlaps(start, end, booking.start, booking.end)) {
      return { error: ERROR_CODES.BOOKING_TIME_OVERLAP, status: 409 };
    }
  }

  const booking = {
    bookingId: `bkg-${bookingCounter++}`,
    roomId,
    userId,
    start,
    end
  };

  const updatedBookings = [...existingBookings, booking].sort(
    (a, b) => a.start - b.start
  );

  bookingsByRoom.set(roomId, updatedBookings);

  return {
    booking: {
      bookingId: booking.bookingId,
      room,
      startTime,
      endTime
    }
  };
}

function cancelBooking({ bookingId, userId }) {
  for (const [roomId, bookings] of bookingsByRoom.entries()) {
    const index = bookings.findIndex(b => b.bookingId === bookingId);
    if (index === -1) continue;

    const booking = bookings[index];

    if (booking.userId !== userId) {
      return { error: ERROR_CODES.FORBIDDEN, status: 403 };
    }

    if (booking.start <= new Date()) {
      return { error: ERROR_CODES.BOOKING_ALREADY_STARTED, status: 409 };
    }

    bookings.splice(index, 1);
    bookingsByRoom.set(roomId, bookings);
    return { success: true };
  }

  return { error: ERROR_CODES.BOOKING_NOT_FOUND, status: 404 };
}

function getRoomBookings({ roomId, userId }) {
  const room = getRoomById(roomId);
  if (!room) {
    return { error: ERROR_CODES.ROOM_NOT_FOUND, status: 404 };
  }

  const bookings = bookingsByRoom.get(roomId) || [];

  return {
    room,
    bookings: bookings.map(b => ({
      bookingId: b.bookingId,
      startTime: formatDate(b.start),
      endTime: formatDate(b.end),
      isMine: b.userId === userId
    }))
  };
}

function formatDate(date) {
  const pad = n => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export {
  createBooking,
  cancelBooking,
  getRoomBookings
};