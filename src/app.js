const express = require("express");
const bookingRoutes = require("./routes/bookingRoutes");
const roomRoutes = require("./routes/roomRoutes");
const routeCatcher = require("./middleware/routeCatcher");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

app.use("/bookings", bookingRoutes);
app.use("/rooms", roomRoutes);

// Catch-all route for undefined endpoints
app.use(routeCatcher);

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;
