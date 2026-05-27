const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(

  {

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: [
        "client",
        "freelancer",
        "admin"
      ],
      default: "client"
    },

    resume: {
      type: String
    }

  },

  {

    timestamps: true

  }

);

module.exports = mongoose.model(
  "User",
  userSchema
);