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

      resource_type: "image",

      format: "pdf"

    })

  });

const upload = multer({
  storage
});

module.exports = upload;