const Application =
  require("../models/Application");

const Notification =
  require("../models/Notification");

const applyToJob = async (
  req,
  res
) => {

  try {

    const {

      proposalText,
      bidAmount,
      estimatedDays

    } = req.body;

    console.log("FILE:", req.file);

    const application =
      await Application.create({

        job: req.params.jobId,

        freelancer: req.user.id,

        proposalText,

        bidAmount,

        estimatedDays,

        resume: req.file
          ? req.file.path
          : "",

        status: "pending"

      });

    res.status(201).json(
      application
    );

  }

  catch (error) {

     console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};

const getApplicationsForJob =
  async (req, res) => {

    try {

      const applications =
        await Application.find({

          job: req.params.jobId

        }).populate(

          "freelancer",

          "name email"

        );

      res.status(200).json(
        applications
      );

    }

    catch (error) {

      res.status(500).json({

        message: error.message

      });

    }

};

const updateApplicationStatus =
  async (req, res) => {

    try {

      const application =
        await Application.findById(

          req.params.applicationId

        );

      if (!application) {

        return res.status(404).json({

          message:
            "Application not found"

        });

      }

      application.status =
        req.body.status;

      await application.save();

      if (
        req.body.status ===
        "accepted"
      ) {

        await Notification.create({

          user:
            application.freelancer,

          text:
            "Your application was accepted"

        });

      }

      if (
        req.body.status ===
        "rejected"
      ) {

        await Notification.create({

          user:
            application.freelancer,

          text:
            "Your application was rejected"

        });

      }

      res.status(200).json({

        message:
          "Status updated successfully",

        application

      });

    }

    catch (error) {

      res.status(500).json({

        message: error.message

      });

    }

};

module.exports = {

  applyToJob,

  getApplicationsForJob,

  updateApplicationStatus

};