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

      public_id:
        Date.now() +
        "-" +
        file.originalname
          .replace(".pdf", "")

    })

  });

const upload = multer({
  storage
});

module.exports = upload;