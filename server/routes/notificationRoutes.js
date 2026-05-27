const express = require("express");

const router = express.Router();

const Notification =
  require("../models/Notification");

const protect =
  require("../middleware/authMiddleware");

router.get(

  "/",

  protect,

  async (req, res) => {

    try {

      const notifications =
        await Notification.find({

          user: req.user.id

        })

        .sort({

          createdAt: -1

        });

      res.json(notifications);

    }

    catch (error) {

      res.status(500).json({

        message:
          "Failed to load notifications"

      });

    }

  }

);

module.exports = router;