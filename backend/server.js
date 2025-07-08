const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");
require("dotenv").config(); // Load .env variables

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

// --------- CORS Configuration ---------
const allowedOrigins = [
  "http://localhost:5173",
  "https://jkworks-architecture-website.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ CORS Not Allowed: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors()); // Preflight support

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
  res.status(200).send("✅ API is running...");
});

// --------- Start Server ---------
app.listen(PORT, () => {
  log(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
});
