const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");
require("dotenv").config();
require("colors");

const app = express();

// --------- Logging Helper ---------
const log = (...args) => console.log(`[${new Date().toISOString()}]`, ...args);

// --------- Environment Setup ---------
const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = NODE_ENV === "production";
const DB_URI = isProduction ? process.env.PROD_DB_URI : process.env.DEV_DB_URI;
const PORT = process.env.PORT || 5000;
const BACKEND_PUBLIC_URL = isProduction
  ? "https://jkworks-architecture-website.onrender.com"
  : `http://localhost:${PORT}`;

if (!DB_URI) {
  console.error("❌ DB_URI is missing in your .env file!".red);
  process.exit(1);
}

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((origin) => origin.trim())
  : [];

log("🛡️ Environment:".cyan, NODE_ENV);
log(
  "🔗 MongoDB URI Loaded:".cyan,
  DB_URI.includes("mongodb") ? "✅ Valid" : "❌ Invalid"
);
log("🌐 Allowed Frontend Origins:".cyan, allowedOrigins);

// --------- CORS Setup ---------
app.use(
  cors({
    origin: (origin, callback) => {
      log("🌐 Incoming Origin:".blue, origin || "Internal/Server-side");

      if (!origin || allowedOrigins.includes(origin)) {
        log("✅ CORS Allowed:".green, origin || "Internal Request");
        callback(null, true);
      } else {
        log("❌ CORS Blocked:".red, origin);
        callback(new Error("CORS Not Allowed: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
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
  .connect(DB_URI)
  .then(() => log("✅ Connected to MongoDB".brightMagenta))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:".red, err.message);
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
<<<<<<< HEAD
app.use("/uploads", (req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
}, express.static(path.join(__dirname, "uploads")));

=======
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
>>>>>>> origin/abhay

log("📁 Static uploads served from:".cyan, path.join(__dirname, "uploads"));

// --------- Health Check ---------
app.get("/", (req, res) => {
  res.status(200).json({
    message: "✅ API is running...",
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    allowedOrigins,
    backendURL: BACKEND_PUBLIC_URL,
  });
});

// --------- Error Handling ---------
app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  console.error("❌ Global Error:".red, err.message);
  res.status(500).json({ error: "Something went wrong!" });
});

// --------- Start Server ---------
app.listen(PORT, () => {
  const host = require("os").hostname();
  const nodeVersion = process.version;

  console.log("\n🚀 Server Boot Complete".green.bold);
  console.log("🔹 Mode:".brightCyan, NODE_ENV);
  console.log("🔹 App URL:".brightCyan, BACKEND_PUBLIC_URL);
  console.log("🔹 API Health:".brightCyan, `${BACKEND_PUBLIC_URL}/`);
  console.log("🔹 Node.js Version:".brightCyan, nodeVersion);
  console.log("🔹 Host Machine:".brightCyan, host);
  console.log(
    "🔹 MongoDB:".brightCyan,
    isProduction ? "Production DB" : "Local DB"
  );
  console.log("🔹 Allowed CORS Origins:".brightCyan, allowedOrigins);
  console.log("⏱️ Started at:", new Date().toLocaleString());
  console.log("====================================\n".gray);
});
