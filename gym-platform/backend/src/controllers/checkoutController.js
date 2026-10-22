const { createCheckoutSession } = require("../services/stripeService");
const { asyncHandler, AppError } = require("../utils/errors");

const createCheckout = asyncHandler(async (req, res) => {
  const { email, tier } = req.body;

  if (!email || !tier) {
    throw new AppError("email and tier are required", 400);
  }

  const session = await createCheckoutSession({ email, tier });

  res.status(200).json({ sessionId: session.id, url: session.url });
});

module.exports = { createCheckout };
