require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const checkoutRoutes = require("./routes/checkout");
const webhookRoutes = require("./routes/webhooks");
const bookingRoutes = require("./routes/bookings");
const exerciseRoutes = require("./routes/exercises");

const { AppError } = require("./utils/errors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: "Too many requests, please try again later" },
  })
);

app.use("/api", checkoutRoutes);
app.use("/api", webhookRoutes);
app.use("/api", bookingRoutes);
app.use("/api", exerciseRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

app.listen(PORT, () => {
  console.log(`Gym platform backend running on port ${PORT}`);
});

module.exports = app;
