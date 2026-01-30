import express from "express";
import bookingRoutes from "./routes/bookingRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import routeCatcher from "./middleware/routeCatcher.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());

app.use("/bookings", bookingRoutes);
app.use("/rooms", roomRoutes);

// Catch-all route for undefined endpoints
app.use(routeCatcher);

// Global error handler (must be last)
app.use(errorHandler);

export default app;