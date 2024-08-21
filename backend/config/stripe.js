const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIP_SECRET_KEY);

module.exports = stripe;
