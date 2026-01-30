import express from "express";
import { createBookingHandler, cancelBookingHandler } from "../controllers/bookingController.js";
import requireUser from "../middleware/requireUser.js";
import validateRequest from "../middleware/validateRequest.js";
import { validateCreateBooking, validateCancelBooking } from "../validators/bookingValidators.js";

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

export default router;