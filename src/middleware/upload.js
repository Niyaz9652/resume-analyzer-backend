const multer = require("multer");

const maxSizeMB = Number(process.env.MAX_FILE_SIZE_MB) || 5;
const allowedExtensions = [".pdf", ".docx"];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxSizeMB * 1024 * 1024,
    files: 1
  },
  fileFilter: (req, file, callback) => {
    const extension = file.originalname.toLowerCase().slice(file.originalname.lastIndexOf("."));
    if (!allowedExtensions.includes(extension)) {
      const error = new Error("Only PDF and DOCX files are supported.");
      error.statusCode = 400;
      return callback(error);
    }
    callback(null, true);
  }
});

module.exports = upload;
