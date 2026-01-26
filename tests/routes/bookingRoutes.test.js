const request = require("supertest");
const app = require("../../src/app");

const {
  setupTestStore,
  setupTestTime,
  teardownTestTime
} = require("../helpers/testSetup");

const {
  buildBooking,
  buildOverlappingBooking
} = require("../factories/bookingFactory");

const { withUser } = require("../factories/authFactory");

describe("Booking Routes – Integration", () => {
  beforeEach(() => {
    setupTestStore();
    setupTestTime();
  });

  afterEach(() => {
    teardownTestTime();
  });

  test("returns 401 when user is not authenticated", async () => {
    const res = await request(app)
      .post("/bookings")
      .send(buildBooking());

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  test("returns 400 for missing fields", async () => {
    const res = await request(app)
      .post("/bookings")
      .set(withUser())
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("BAD_REQUEST");
  });

  test("creates a booking successfully", async () => {
    const res = await request(app)
      .post("/bookings")
      .set(withUser("user-1"))
      .send(buildBooking());

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.roomId).toBe("room-1");
  });

  test("returns 409 for overlapping bookings", async () => {
    await request(app)
      .post("/bookings")
      .set(withUser("user-1"))
      .send(buildBooking());

    const res = await request(app)
      .post("/bookings")
      .set(withUser("user-2"))
      .send(buildOverlappingBooking());

    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe("TIME_OVERLAP");
  });

  test("allows owner to cancel booking", async () => {
    const createRes = await request(app)
      .post("/bookings")
      .set(withUser("user-1"))
      .send(buildBooking());

    const bookingId = createRes.body.id;

    const cancelRes = await request(app)
      .delete(`/bookings/${bookingId}`)
      .set(withUser("user-1"));

    expect(cancelRes.status).toBe(200);
  });

  test("prevents non-owner from cancelling booking", async () => {
    const createRes = await request(app)
      .post("/bookings")
      .set(withUser("user-1"))
      .send(buildBooking());

    const bookingId = createRes.body.id;

    const cancelRes = await request(app)
      .delete(`/bookings/${bookingId}`)
      .set(withUser("user-2"));

    expect(cancelRes.status).toBe(403);
    expect(cancelRes.body.error.code).toBe("FORBIDDEN");
  });
});
