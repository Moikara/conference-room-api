const {
  initializeStore,
  getBookings
} = require("../../src/data/store");

const {
  createBooking,
  cancelBooking,
  getRoomBookings
} = require("../../src/services/bookingService");

const {
  createTestBooking
} = require("../factories/serviceBookingFactory");

const {
  minutesFromNow,
  hoursFromNow,
  toISO
} = require("../helpers/time");

describe("Booking Service – Complete Test Suite", () => {
  beforeEach(() => {
    initializeStore();
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-01-26T09:00:00"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("creates a valid booking", () => {
    const booking = createTestBooking();

    expect(booking.id).toBeDefined();
    expect(booking.roomId).toBe("room-1");
  });

  test("rejects overlapping bookings", () => {
    createTestBooking();

    const result = createBooking({
      roomId: "room-1",
      userId: "user-2",
      startTime: toISO(hoursFromNow(1.5)),
      endTime: toISO(hoursFromNow(2.5))
    });

    expect(result.error.code).toBe("TIME_OVERLAP");
  });

  test("allows owner to cancel before start time", () => {
    const booking = createTestBooking();

    const result = cancelBooking({
      bookingId: booking.id,
      userId: "user-1"
    });

    expect(result.success).toBe(true);
    expect(getBookings()).toHaveLength(0);
  });

  test("prevents cancellation after start time", () => {
    const booking = createTestBooking({
      startTime: toISO(minutesFromNow(30)),
      endTime: toISO(minutesFromNow(90))
    });

    jest.setSystemTime(minutesFromNow(45));

    const result = cancelBooking({
      bookingId: booking.id,
      userId: "user-1"
    });

    expect(result.error.code).toBe("CANCELLATION_NOT_ALLOWED");
  });

  test("returns bookings sorted by start time", () => {
    createTestBooking({
      startTime: toISO(hoursFromNow(3)),
      endTime: toISO(hoursFromNow(4))
    });

    createTestBooking({
      startTime: toISO(hoursFromNow(1)),
      endTime: toISO(hoursFromNow(2))
    });

    const result = getRoomBookings({
      roomId: "room-1",
      userId: "user-1"
    });

    expect(result.bookings[0].startTime)
      .toBe(toISO(hoursFromNow(1)));
  });
});
