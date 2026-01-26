const express = require("express");
const {
  createBookingHandler,
  cancelBookingHandler
} = require("../controllers/bookingController");
const requireUser = require("../middleware/requireUser");
const validateRequest = require("../middleware/validateRequest");
const {
  validateCreateBooking,
  validateCancelBooking
} = require("../validators/bookingValidators");

const router = express.Router();

router.use(requireUser);

// POST /bookings
router.post(
  "/",
  validateRequest([validateCreateBooking]),
  createBookingHandler
);

// DELETE /bookings/:bookingId
router.delete(
  "/:bookingId",
  validateRequest([validateCancelBooking]),
  cancelBookingHandler
);

module.exports = router;
