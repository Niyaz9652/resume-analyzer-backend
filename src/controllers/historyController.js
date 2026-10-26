const Analysis = require("../models/Analysis");

async function getAnalyses(req, res, next) {
  try {
    const items = await Analysis.find()
      .select("fileName result.score result.summary createdAt")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    res.json({ success: true, analyses: items });
  } catch (error) {
    next(error);
  }
}

async function getAnalysisById(req, res, next) {
  try {
    const item = await Analysis.findById(req.params.id).select("-resumeText");
    if (!item) {
      return res.status(404).json({ success: false, message: "Analysis not found." });
    }
    res.json({ success: true, analysis: item });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid analysis ID." });
    }
    next(error);
  }
}

module.exports = { getAnalyses, getAnalysisById };
