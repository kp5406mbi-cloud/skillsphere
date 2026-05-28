const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const upload =
  require("../middleware/uploadMiddleware");

const {

  applyToJob,

  getApplicationsForJob,

  updateApplicationStatus

} = require(

  "../controllers/applicationController"

);

router.post(
  "/:jobId/apply",
  protect,
  (req, res, next) => {

    upload.single("resume")(
      req,
      res,
      function (err) {

        if (err) {

          console.log(
            "UPLOAD ERROR:",
            err
          );

          return res.status(500).json({
            message: err.message
          });

        }

        next();

      }
    );

  },
  applyToJob
);

router.get(

  "/:jobId/applicants",

  protect,

  getApplicationsForJob

);

router.put(

  "/:jobId/applications/:applicationId",

  protect,

  updateApplicationStatus

);

module.exports = router;