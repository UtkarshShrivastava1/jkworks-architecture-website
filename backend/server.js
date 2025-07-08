const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

// --------- Logging Helper ---------
const log = (...args) => {
  console.log(`[${new Date().toISOString()}]`, ...args);
};

// --------- Environment Setup ---------
const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = NODE_ENV === "production";
const DB_URI = isProduction ? process.env.PROD_DB_URI : process.env.DEV_DB_URI;
const PORT = process.env.PORT || 5000;

// --------- CORS Configuration (UPDATED) ---------
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173", // Vite dev server
  "https://jkworks-architecture-website.vercel.app",
];

// Add additional origins from environment variable
if (process.env.FRONTEND_URL) {
  const envOrigins = process.env.FRONTEND_URL.split(",").map((origin) =>
    origin.trim()
  );
  allowedOrigins.push(...envOrigins);
}

// Remove duplicates
const uniqueOrigins = [...new Set(allowedOrigins)];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      if (uniqueOrigins.includes(origin)) {
        callback(null, true);
      } else {
        log("❌ CORS Rejected:", origin);
        log("✅ Allowed Origins:", uniqueOrigins);
        callback(new Error("❌ CORS Not Allowed: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// --------- Middleware ---------
app.use(express.json());
app.use(compression());
app.use(helmet());

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
    log("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// --------- Routes ---------
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const blogRoutes = require("./routes/blogs");
const faqRoutes = require("./routes/faqRoutes");
const contactRoutes = require("./routes/contact");

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/contact", contactRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --------- Health Check ---------
app.get("/", (req, res) => {
  res.status(200).json({
    message: "✅ API is running...",
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    allowedOrigins: uniqueOrigins,
  });
});

// --------- Error Handling ---------
app.use((err, req, res, next) => {
  // Always set CORS headers on error responses
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  log("❌ Error:", err.message);
  res.status(500).json({ error: "Something went wrong!" });
});

// --------- Start Server ---------
app.listen(PORT, () => {
  log(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
  log(`✅ Allowed Origins:`, uniqueOrigins);
});
