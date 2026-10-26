const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  fileName: { type: String, required: true, maxlength: 255 },
  jobDescription: { type: String, default: "", maxlength: 20000 },
  resumeText: { type: String, required: true, maxlength: 50000 },
  result: {
    score: { type: Number, min: 0, max: 100, required: true },
    summary: { type: String, required: true },
    strengths: { type: [String], default: [] },
    improvements: { type: [String], default: [] },
    matchedSkills: { type: [String], default: [] },
    missingSkills: { type: [String], default: [] },
    recommendations: { type: [String], default: [] }
  }
}, { timestamps: true });

const Analysis = mongoose.model("Analysis", analysisSchema);

module.exports = Analysis;
