const express = require("express");

const router = express.Router();

const upload =
  require("../middleware/uploadMiddleware");

const {
  createJob,
  getJobs,
  applyToJob,
  getJobById,
  getMyApplications,
  getJobApplicants,
  getClientJobs
} = require("../controllers/jobController");

const protect =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

  const {
  updateApplicationStatus
} = require("../controllers/jobController");

router.post(
  "/",
  protect,
  authorizeRoles("client"),
  createJob
);

router.get(
  "/",
  getJobs
);

router.get(
  "/my/applications",
  protect,
  authorizeRoles("freelancer"),
  getMyApplications
);

router.get(
  "/:id/applicants",
  protect,
  authorizeRoles("client"),
  getJobApplicants
);

router.put(

  "/:jobId/applications/:applicationId",

  protect,

  updateApplicationStatus

);

router.get(
  "/client/my-jobs",
  protect,
  authorizeRoles("client"),
  getClientJobs
);

router.post(

    "/:jobId/apply",

  protect,

  authorizeRoles("freelancer"),

  upload.single("resume"),

  applyToJob

);

router.get(
  "/:id",
  getJobById
);

module.exports = router;