const express = require("express");

const router = express.Router();

const Message = require("../models/Message");

const protect = require("../middleware/authMiddleware");

router.post(

  "/send",

  protect,

  async (req, res) => {

    try {

      console.log("BODY:", req.body);

      console.log("USER:", req.user);

      const {

        receiver,
        text

      } = req.body;

      const message =
        await Message.create({

          sender: req.user._id,

          receiver,

          text

        });

      res.status(201).json(message);

    }

    catch (error) {

      console.log("MESSAGE ERROR:", error);

      res.status(500).json({

        message:
          "Failed to send message"

      });

    }

  }

);

router.get(

  "/:userId",

  protect,

  async (req, res) => {

    try {

      const messages =
        await Message.find({

          $or: [

            {

              sender: req.user._id,

              receiver: req.params.userId

            },

            {

              sender: req.params.userId,

              receiver: req.user._id

            }

          ]

        })

        .sort({

          createdAt: 1

        });

      res.json(messages);

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to load messages"

      });

    }

  }

);

module.exports = router;