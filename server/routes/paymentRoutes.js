const express =
  require("express");

const Razorpay =
  require("razorpay");

const router =
  express.Router();

const protect =
  require("../middleware/authMiddleware");

console.log(
  "KEY:",
  process.env.RAZORPAY_KEY_ID
);

console.log(
  "SECRET:",
  process.env.RAZORPAY_KEY_SECRET
);

const razorpay =
  new Razorpay({

    key_id:
      process.env.RAZORPAY_KEY_ID,

    key_secret:
      process.env.RAZORPAY_KEY_SECRET

  });

const {

  verifyPayment

} = require(
  "../controllers/paymentController"
);

router.post(

  "/verify",

  protect,

  verifyPayment

);

router.post(

  "/create-order",

  protect,

  async (req, res) => {

    try {

      console.log(
        "BODY:",
        req.body
      );

      const { amount } =
        req.body;

      const options = {

        amount:
          amount * 100,

        currency:
          "INR",

        receipt:
          `receipt_${Date.now()}`

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

      res.status(200).json({

        order

      });

    }

    catch (error) {

      console.log(
        "PAYMENT ERROR:"
      );

      console.log(
        "FULL ERROR:",
        error
      );

      res.status(500).json({

        message:
          "Order creation failed"

      });

    }

  }

);

module.exports =
  router;