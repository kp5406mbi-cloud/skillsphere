const Application =
  require("../models/Application");

const Notification =
  require("../models/Notification");

const cloudinary =
  require("../config/cloudinary");

const streamifier =
  require("streamifier");

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

    let resumeUrl = "";

    if (req.file) {

      const result =
        await new Promise(

          (resolve, reject) => {

            const stream =
              cloudinary.uploader.upload_stream(

                {

                  folder:
                    "skillsphere_resumes",

                  resource_type:
                    "raw"

                },

                (error, result) => {

                  if (error) {

                    reject(error);

                  }

                  else {

                    resolve(result);

                  }

                }

              );

            streamifier
              .createReadStream(
                req.file.buffer
              )
              .pipe(stream);

          }

        );

      resumeUrl =
        result.secure_url;

    }

    const application =
      await Application.create({

        job: req.params.jobId,

        freelancer: req.user.id,

        proposalText,

        bidAmount,

        estimatedDays,

        resume: resumeUrl,

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