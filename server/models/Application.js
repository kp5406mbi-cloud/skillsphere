const mongoose = require("mongoose");

const applicationSchema =
  new mongoose.Schema(

    {

      job: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Job",

        required: true

      },

      freelancer: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

      },

      proposalText: {

        type: String,

        required: true

      },

      bidAmount: {

        type: Number,

        required: true

      },

      estimatedDays: {

        type: Number,

        required: true

      },

      resume: {

        type: String

      },

      status: {

        type: String,

        enum: [
          "pending",
          "accepted",
          "rejected"
        ],

        default: "pending"

      }

    },

    {

      timestamps: true

    }

  );

module.exports = mongoose.model(
  "Application",
  applicationSchema
);