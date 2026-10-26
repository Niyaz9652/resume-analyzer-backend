const Analysis = require("../models/Analysis");
const { extractResumeText } = require("../services/resumeParser");
const { analyzeResume } = require("../services/aiService");

async function createAnalysis(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please upload a PDF or DOCX resume." });
    }

    const jobDescription = String(req.body.jobDescription || "").trim();
    if (jobDescription.length > 20000) {
      return res.status(400).json({ success: false, message: "Job description must be 20,000 characters or fewer." });
    }

    const resumeText = await extractResumeText(req.file);
    const result = await analyzeResume({ resumeText, jobDescription });

    const saved = await Analysis.create({
      fileName: req.file.originalname.slice(0, 255),
      jobDescription,
      resumeText,
      result
    });

    return res.status(201).json({
      success: true,
      message: "Resume analyzed successfully.",
      analysis: {
        id: saved._id,
        fileName: saved.fileName,
        createdAt: saved.createdAt,
        result: saved.result
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createAnalysis };
