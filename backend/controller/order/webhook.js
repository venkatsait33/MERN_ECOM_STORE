const stripe = require("../../config/stripe");
const endpointSecret = process.env.STRIP_ENDPOINT_WEBHOOK_SECRET_KEY;

const webhook = async (request, response) => {
  const sig = request.headers["stripe-signature"];

    const payloadString = JSON.stringify(request.body);
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret:endpointSecret,
    });

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
    }
    response.status(200).send()
};

module.exports = webhook;
