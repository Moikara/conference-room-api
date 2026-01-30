import express from "express";
import getRoomBookingsHandler from "../controllers/roomController.js";
import requireUser from "../middleware/requireUser.js";
import validateRequest from "../middleware/validateRequest.js";
import validateRoomIdParam from "../validators/roomValidators.js";

const router = express.Router();

router.get(
  "/:roomId/bookings",
  requireUser,
  validateRequest([validateRoomIdParam]),
  getRoomBookingsHandler
);

export default router;