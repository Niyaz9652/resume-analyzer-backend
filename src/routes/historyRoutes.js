const express = require("express");
const { getAnalyses, getAnalysisById } = require("../controllers/historyController");

const router = express.Router();

router.get("/", getAnalyses);
router.get("/:id", getAnalysisById);

module.exports = router;
