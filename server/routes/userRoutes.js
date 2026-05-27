const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const User = require("../models/User");

router.post(
  "/upload-resume",
  protect,
  upload.single("resume"),
  async (req, res) => {

    const user = await User.findById(req.user.id);

    user.resume = req.file.filename;

    await user.save();

    res.json({
      message: "Resume uploaded",
      resume: req.file.filename
    });

  }
);

router.get("/profile", protect, async (req, res) => {

  const user = await User.findById(req.user.id).select("-password");

  res.json(user);

});

module.exports = router;