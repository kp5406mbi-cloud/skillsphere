const multer = require("multer");

const cloudinary = require("../config/cloudinary");

const {
  CloudinaryStorage
} = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({

  cloudinary,

  params: {

    folder: "skillsphere_resumes",

    resource_type: "raw"

  }

});

const upload = multer({
  storage
});

module.exports = upload;