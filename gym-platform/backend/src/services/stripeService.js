const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async ({ email, tier }) => {
  const tierConfigs = {
    Basic: { priceId: "price_basic_monthly", amount: 2900 },
    Performance: { priceId: "price_performance_monthly", amount: 5900 },
    VIP: { priceId: "price_vip_monthly", amount: 9900 },
  };

  const config = tierConfigs[tier];
  if (!config) {
    const err = new Error(`Invalid subscription tier: ${tier}`);
    err.statusCode = 400;
    throw err;
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [
      {
        price: config.priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/cancel`,
    metadata: {
      email,
      tier,
    },
  });

  return session;
};

module.exports = { stripe, createCheckoutSession };
