const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(

  {

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    skillsRequired: [String],

    budget: {
      type: Number,
      required: true
    },

    deadline: {
      type: Date,
      required: true
    },

    client: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true

    },

    status: {

      type: String,

      default: "open"

    },

    applications: [

  {

    freelancer: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User"

    },

    status: {

      type: String,

      enum: [
        "pending",
        "accepted",
        "rejected"
      ],

      default: "pending"

    },

    paymentStatus: {
  type: String,
  enum: ["pending", "completed"],
  default: "pending"
},

    proposalText: String,

    bidAmount: Number,

    estimatedDays: Number,

    resume: String,

    appliedAt: {

      type: Date,

      default: Date.now

    }

  }

]

   

  },

  {

    timestamps: true

  }

);

module.exports =
  mongoose.model("Job", jobSchema);