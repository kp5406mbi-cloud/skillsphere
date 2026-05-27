const express = require("express");

const Razorpay = require("razorpay");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const routerPayments =
  express.Router();

console.log(
  "KEY:",
  process.env.RAZORPAY_KEY_ID
);

console.log(
  "SECRET:",
  process.env.RAZORPAY_KEY_SECRET
);

const razorpay = new Razorpay({

  key_id:
    process.env.RAZORPAY_KEY_ID,

  key_secret:
    process.env.RAZORPAY_KEY_SECRET

});

router.post(

  "/create-order",

  protect,

  async (req, res) => {

    try {

      console.log(
        "BODY:",
        req.body
      );

      const { amount } = req.body;

      const options = {

        amount: amount * 100,

        currency: "INR"

      };

      console.log(
        "OPTIONS:",
        options
      );

      const order =
        await razorpay.orders.create(
          options
        );

      console.log(
        "ORDER:",
        order
      );

      res.json({ order });

    }

    catch (error) {

      console.log(
        "PAYMENT ERROR:"
      );

      console.log(error.error || error.message || error);

      res.status(500).json({

        message:
          "Order creation failed"

      });

    }

  }

);

module.exports = router;