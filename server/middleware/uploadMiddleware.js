const multer = require("multer");

const {
  CloudinaryStorage
} = require("multer-storage-cloudinary");

const cloudinary =
  require("../config/cloudinary");

const storage =
  new CloudinaryStorage({

    cloudinary,

    params: async (req, file) => ({

      folder: "skillsphere_resumes",

      resource_type: "raw",

      format: "pdf",

      use_filename: true,

      unique_filename: true

    })

  });

const upload = multer({
  storage
});

module.exports = upload;