const Application =
  require("../models/Application");

const crypto =
  require("crypto");

const Payment =
  require("../models/Payment");

const verifyPayment =
  async (req, res) => {

    try {

      console.log("VERIFY BODY:", req.body);

      const {

        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature,

        freelancerId,

        jobId,

        amount

      } = req.body;

      const generatedSignature =

        crypto

          .createHmac(

            "sha256",

            process.env
              .RAZORPAY_KEY_SECRET

          )

          .update(

            razorpay_order_id +

            "|" +

            razorpay_payment_id

          )

          .digest("hex");

      if (

        generatedSignature !==

        razorpay_signature

      ) {

        return res.status(400).json({

          message:
            "Invalid payment signature"

        });

      }

      console.log(
  "FREELANCER ID:",
  freelancerId
);

      const payment =
        await Payment.create({

          client:
            req.user.id,

          freelancer:
            freelancerId,

          job: jobId,

          amount,

          razorpayOrderId:
            razorpay_order_id,

          paymentId:
            razorpay_payment_id,

          status:
            "completed"

        });

        await Application.findOneAndUpdate(

  {

    job: jobId,

    freelancer: freelancerId

  },

  {

    paymentStatus:
      "completed"

  }

);

      res.status(200).json({

        success: true,

        payment

      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Payment verification failed"

      });

    }

};

module.exports = {

  verifyPayment

};