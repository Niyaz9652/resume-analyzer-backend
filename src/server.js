require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const analyzeRoutes = require("./routes/analyzeRoutes");
const historyRoutes = require("./routes/historyRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "AI Resume Analyzer API is running" });
});

app.use("/api/analyze", analyzeRoutes);
app.use("/api/analyses", historyRoutes);
app.use(notFound);
app.use(errorHandler);

async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
