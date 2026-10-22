const express = require("express");
const router = express.Router();
const { createCheckout } = require("../controllers/checkoutController");

router.post("/checkout", createCheckout);

module.exports = router;
