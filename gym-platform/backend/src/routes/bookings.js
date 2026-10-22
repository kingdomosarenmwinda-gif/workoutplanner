const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const { createBooking } = require("../controllers/bookingController");

router.post("/bookings/create", authenticate, createBooking);

module.exports = router;
