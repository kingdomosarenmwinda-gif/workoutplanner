const { validateBooking, createBooking } = require("../services/bookingService");
const { asyncHandler } = require("../utils/errors");

const createBookingHandler = asyncHandler(async (req, res) => {
  const { member_id, class_id } = req.body;

  if (!member_id || !class_id) {
    const err = new Error("member_id and class_id are required");
    err.statusCode = 400;
    throw err;
  }

  await validateBooking(member_id, class_id);
  const booking = await createBooking(member_id, class_id);

  res.status(201).json(booking);
});

module.exports = { createBooking: createBookingHandler };
