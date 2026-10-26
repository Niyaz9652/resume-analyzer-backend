const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

async function extractResumeText(file) {
  const extension = file.originalname.toLowerCase().slice(file.originalname.lastIndexOf("."));
  let text = "";

  if (extension === ".pdf") {
    const parsed = await pdfParse(file.buffer);
    text = parsed.text || "";
  } else if (extension === ".docx") {
    const parsed = await mammoth.extractRawText({ buffer: file.buffer });
    text = parsed.value || "";
  } else {
    const error = new Error("Unsupported file type. Upload a PDF or DOCX file.");
    error.statusCode = 400;
    throw error;
  }

  const normalized = text.replace(/\u0000/g, "").replace(/[ \t]+\n/g, "\n").trim();
  if (normalized.length < 50) {
    const error = new Error("We could not extract enough text. If this is a scanned PDF, use an OCR-readable PDF or DOCX file.");
    error.statusCode = 400;
    throw error;
  }

  return normalized.slice(0, 50000);
}

module.exports = { extractResumeText };
