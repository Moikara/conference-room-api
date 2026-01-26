const { hoursFromNow, toISO } = require("../helpers/time");

function buildBooking(overrides = {}) {
  return {
    roomId: "room-1",
    startTime: toISO(hoursFromNow(1)),
    endTime: toISO(hoursFromNow(2)),
    ...overrides
  };
}

function buildOverlappingBooking(overrides = {}) {
  return buildBooking({
    startTime: toISO(hoursFromNow(1.5)),
    endTime: toISO(hoursFromNow(2.5)),
    ...overrides
  });
}

module.exports = {
  buildBooking,
  buildOverlappingBooking
};
