const { createBooking } = require("../../src/services/bookingService");
const { hoursFromNow, toISO } = require("../helpers/time");

function createTestBooking(overrides = {}) {
  const result = createBooking({
    roomId: "room-1",
    userId: "user-1",
    startTime: toISO(hoursFromNow(1)),
    endTime: toISO(hoursFromNow(2)),
    ...overrides
  });

  if (result.error) {
    throw new Error(`Test setup failed: ${result.error.code}`);
  }

  return result.booking;
}

module.exports = {
  createTestBooking
};
