const express = require("express");
const functions = require("firebase-functions");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51PS1RH08GuQqUq6kfMX7ytP3HCZKYkyAhJALqmlywRAW4M3OIFPEjaDDo2088Lm9Ea4XnfgtN4ChwUh24mMHTPwr00gWyo4KBi");

// API

// API config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (req, res) => res.status(200).send("Hello world"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payment Request Received for this amount.......", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = functions.https.onRequest(app);

// http://127.0.0.1:5001/clone-70418/us-central1/api
