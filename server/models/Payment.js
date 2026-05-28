const mongoose = require("mongoose");

const paymentSchema =
  new mongoose.Schema(

    {

      client: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

      },

      freelancer: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

      },

      job: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Job",

        required: true

      },

      amount: {

        type: Number,

        required: true

      },

      razorpayOrderId: String,

      paymentId: {

  type: String,

  unique: true

},

      status: {

        type: String,
        

        enum: [
          "pending",
          "completed"
        ],

        default: "pending"

      }

    },

    {

      timestamps: true

    }

  );

module.exports =
  mongoose.model(
    "Payment",
    paymentSchema
  );