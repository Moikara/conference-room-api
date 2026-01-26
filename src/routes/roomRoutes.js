const express = require("express");
const { getRoomBookingsHandler } = require("../controllers/roomController");
const requireUser = require("../middleware/requireUser");
const validateRequest = require("../middleware/validateRequest");
const { validateRoomIdParam } = require("../validators/roomValidators");

const router = express.Router();

router.get(
  "/:roomId/bookings",
  requireUser,
  validateRequest([validateRoomIdParam]),
  getRoomBookingsHandler
);

module.exports = router;
