import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51MK4wxLWegxgVZbeIh6MuotQSNm0SNk1efn3KMuS3voHGzhJCqHlpXqknC7HwUN2pKOMUE8aRi65C55r26xfChjp00clLqOnnX"
);

export const processPayment = async (req, res) => {
  let status, paymentId, paymentStatus;
  const { token, amount } = req.body;
  try {
    const payment = await stripe.charges.create({
      source: token.id,
      amount,
      currency: "usd",
    });
    paymentId = payment.id;
    paymentStatus = payment.status;
    status = "success";
  } catch (error) {
    console.log(error);
    status = "failure";
  }
  res.json({ status, paymentId, paymentStatus });
};
