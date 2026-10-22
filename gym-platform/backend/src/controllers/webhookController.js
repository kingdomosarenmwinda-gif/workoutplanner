const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const prisma = require("../utils/prismaClient");
const { asyncHandler, AppError } = require("../utils/errors");

const handleStripeWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    throw new AppError(`Webhook signature verification failed: ${err.message}`, 400);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { email, tier } = session.metadata || {};

    const member = await prisma.member.findUnique({ where: { email } });
    if (member) {
      await prisma.member.update({
        where: { id: member.id },
        data: { account_status: "Active", subscription_tier: tier },
      });

      if (session.payment_intent) {
        await prisma.payment.create({
          data: {
            member_id: member.id,
            stripe_payment_id: session.payment_intent,
            amount: session.amount_total || 0,
            currency: (session.currency || "usd").toUpperCase(),
            status: "succeeded",
          },
        });
      }
    }
  }

  res.json({ received: true });
});

module.exports = { handleStripeWebhook };
