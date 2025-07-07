// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const config = require("./config/config");

const app = express();

// --------- Logging Helper ---------
const log = (...args) => {
  console.log(`[${new Date().toISOString()}]`, ...args);
};

// --------- Middleware ---------
app.use(
  cors({
    origin: ["https://your-vercel-domain.vercel.app"], // ✅ your Vercel frontend
    credentials: true,
  })
);
app.use(express.json());

// Optional: simple request logger (for dev/debug)
app.use((req, res, next) => {
  log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// --------- MongoDB Connection ---------
mongoose
  .connect(config.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => log("✅ Connected to MongoDB"))
  .catch((err) => {
    log("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  });

// --------- Routes ---------
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const blogRoutes = require("./routes/blogs");
const faqRoutes = require("./routes/faqRoutes");
const contactRoutes = require("./routes/contact");

app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/faqs", faqRoutes);

// Health check + auto-wake endpoint
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// --------- Start Server ---------
app.listen(config.port, () => {
  log(
    `🚀 Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${config.port}`
  );
});
