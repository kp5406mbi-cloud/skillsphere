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

      type: "upload",

      access_mode: "public",

      format: "pdf",

      use_filename: false,

      unique_filename: true

    })

  });

const upload = multer({
  storage
});

module.exports = upload;