const request = require("supertest");
const app = require("../../src/app");

const {
  setupTestStore,
  setupTestTime,
  teardownTestTime
} = require("../helpers/testSetup");

const { buildBooking } = require("../factories/bookingFactory");
const { withUser } = require("../factories/authFactory");

describe("Room Routes – Integration", () => {
  beforeEach(() => {
    setupTestStore();
    setupTestTime();
  });

  afterEach(() => {
    teardownTestTime();
  });

  test("returns bookings sorted by start time", async () => {
    await request(app)
      .post("/bookings")
      .set(withUser("user-1"))
      .send(buildBooking({
        startTime: "2026-01-26T12:00:00",
        endTime: "2026-01-26T13:00:00"
      }));

    await request(app)
      .post("/bookings")
      .set(withUser("user-2"))
      .send(buildBooking({
        startTime: "2026-01-26T10:00:00",
        endTime: "2026-01-26T11:00:00"
      }));

    const res = await request(app)
      .get("/rooms/room-1/bookings")
      .set(withUser("user-1"));

    expect(res.status).toBe(200);
    expect(res.body.bookings[0].startTime)
      .toBe("2026-01-26T10:00:00");
  });

  test("does not expose userId for other users' bookings", async () => {
    await request(app)
      .post("/bookings")
      .set(withUser("user-2"))
      .send(buildBooking());

    const res = await request(app)
      .get("/rooms/room-1/bookings")
      .set(withUser("user-1"));

    expect(res.status).toBe(200);
    expect(res.body.bookings[0].userId).toBeUndefined();
  });
});
