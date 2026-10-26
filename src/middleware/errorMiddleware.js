function notFound(req, res, next) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

function errorHandler(error, req, res, next) {
  if (error && error.name === "MulterError") {
    const message = error.code === "LIMIT_FILE_SIZE"
      ? "File is too large. Please upload a smaller resume."
      : error.message;
    return res.status(400).json({ success: false, message });
  }

  const status = error.statusCode || 500;
  const message = status >= 500 ? "Something went wrong on the server." : error.message;
  if (status >= 500) console.error(error);
  return res.status(status).json({ success: false, message });
}

module.exports = { notFound, errorHandler };
