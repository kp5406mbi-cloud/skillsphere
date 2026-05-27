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

  upload.single("resume"),

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