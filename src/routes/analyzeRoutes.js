const express = require("express");
const rateLimit = require("express-rate-limit");
const upload = require("../middleware/upload");
const { createAnalysis } = require("../controllers/analyzeController");

const router = express.Router();
const analyzeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { success: false, message: "Too many analysis requests. Please try again later." }
});

router.post("/", analyzeLimiter, upload.single("resume"), createAnalysis);

module.exports = router;
