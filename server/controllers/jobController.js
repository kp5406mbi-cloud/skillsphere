const mongoose = require("mongoose");
const Job = require("../models/Job");

const createJob = async (req, res) => {

  try {

    console.log(
      "CREATING JOB FOR:",
      req.user
    );

    const {
      title,
      description,
      skillsRequired,
      budget,
      deadline
    } = req.body;

    const job = await Job.create({

      title,
      description,
      skillsRequired,
      budget,
      deadline,

      client: req.user.id

    });

    console.log(
      "CREATED JOB CLIENT:",
      job.client
    );

    res.status(201).json(job);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};

const getJobs = async (req, res) => {

  try {

    const jobs = await Job.find()

      .populate("client", "name email")

      .sort({ createdAt: -1 });

    res.status(200).json(jobs);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};

const applyToJob = async (req, res) => {

  try {

    const proposalText =
      req.body.proposalText;

    const bidAmount =
      req.body.bidAmount;

    const estimatedDays =
      req.body.estimatedDays;

    const job = await Job.findById(
      req.params.jobId
    );

    if (!job) {

      return res.status(404).json({

        message: "Job not found"

      });

    }

    const alreadyApplied =
      job.applications.find(

        (app) =>

          app.freelancer.toString() ===
          req.user.id

      );

    if (alreadyApplied) {

      return res.status(400).json({

        message:
          "Already applied to this job"

      });

    }

    job.applications.push({

      freelancer: req.user.id,

      proposalText,

      bidAmount,

      estimatedDays,

      resume: req.file
        ? req.file.path
        : "",

      appliedAt: new Date()

    });

    await job.save();

    res.status(200).json({

      message:
        "Application submitted successfully",

      job

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};

const getJobById = async (req, res) => {

  try {

    const job = await Job.findById(
      req.params.id
    ).populate(
      "client",
      "name email"
    );

    if (!job) {

      return res.status(404).json({

        message: "Job not found"

      });

    }

    res.status(200).json(job);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};

const getMyApplications = async (req, res) => {

  try {

    const jobs = await Job.find({

      "applications.freelancer":
        req.user.id

    }).populate(
      "client",
      "name email"
    );

    res.status(200).json(jobs);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};

const getJobApplicants = async (req, res) => {

  try {

    const job = await Job.findById(
      req.params.id
    ).populate(
      "applications.freelancer",
      "name email"
    );

    if (!job) {

      return res.status(404).json({

        message: "Job not found"

      });

    }

    if (
      job.client.toString() !==
      req.user.id
    ) {

      return res.status(403).json({

        message: "Access denied"

      });

    }

    res.status(200).json(
      job.applications
    );

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};

const updateApplicationStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const { jobId, applicationId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {

      return res.status(404).json({

        message: "Job not found"

      });

    }

    if (
      job.client.toString() !== req.user.id
    ) {

      return res.status(403).json({

        message: "Access denied"

      });

    }

    const application =
      job.applications.id(applicationId);

    if (!application) {

      return res.status(404).json({

        message: "Application not found"

      });

    }

    application.status = status;

    await job.save();

    res.status(200).json({

      message:
        `Application ${status}`

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};

const getClientJobs = async (req, res) => {

  try {

    console.log(
      "REQ USER:",
      req.user
    );

    const allJobs =
      await Job.find();

    console.log(
      "ALL JOBS:",
      allJobs
    );

    const jobs = await Job.find();

const filteredJobs = jobs.filter(

  (job) =>

    job.client.toString() ===
    req.user.id.toString()

);

console.log(
  "FILTERED JOBS:",
  filteredJobs
);

res.status(200).json(filteredJobs);

return;

    console.log(
  "REQ USER ID:",
  req.user.id
);

allJobs.forEach((job) => {

  console.log(
    "JOB CLIENT:",
    job.client.toString()
  );

});

console.log(
  "FILTERED JOBS:",
  jobs
);

    res.status(200).json(jobs);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server error"

    });

  }

};

module.exports = {

  createJob,
  getJobs,
  applyToJob,
  getJobById,
  getMyApplications,
  getJobApplicants,
  getClientJobs,
  updateApplicationStatus

};