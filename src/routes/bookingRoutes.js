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

router.post(
  "/",
  validateRequest([validateCreateBooking]),
  createBookingHandler
);

router.delete(
  "/:bookingId",
  validateRequest([validateCancelBooking]),
  cancelBookingHandler
);

module.exports = router;
