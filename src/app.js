const express = require("express");
const bookingRoutes = require("./routes/bookingRoutes");
const roomRoutes = require("./routes/roomRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

app.use("/bookings", bookingRoutes);
app.use("/rooms", roomRoutes);

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;
