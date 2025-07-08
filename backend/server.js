// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // Load .env variables at top

const app = express();

// --------- Logging Helper ---------
const log = (...args) => {
  console.log(`[${new Date().toISOString()}]`, ...args);
};

// --------- Env Variables ---------
const NODE_ENV = process.env.NODE_ENV || "development";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const DB_URI =
  NODE_ENV === "production" ? process.env.PROD_DB_URI : process.env.DEV_DB_URI;
const PORT =
  NODE_ENV === "production"
    ? process.env.PROD_PORT || process.env.PORT || 5000
    : process.env.PORT || 5000;
// --------- CORS Setup ---------
const corsOptions = {
  origin: FRONTEND_URL, // or [FRONTEND_URL] if array expected
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // ✅ Enable CORS globally

// --------- Middleware ---------
app.use(express.json());

// Optional: Log request origin and method
app.use((req, res, next) => {
  log(`[${req.method}] ${req.originalUrl} | Origin: ${req.headers.origin}`);
  next();
});

// --------- MongoDB Connection ---------
mongoose
  .connect(DB_URI, {
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

// --------- Health Check ---------
app.get("/", (req, res) => {
  res.status(200).send("✅ API is running...");
});

// --------- Start Server ---------
app.listen(PORT, () => {
  log(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
});
