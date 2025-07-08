const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require('./config/config');

const app = express();

//  CORS Configuration
const allowedOrigins = [
  'https://jkworks-architecture-website.vercel.app', // production frontend domain
  'http://localhost:5173', //  local frontend domain
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  },
  credentials: true,
}));

//  Body parser
app.use(express.json());

//  Connect to MongoDB
mongoose.connect(config.dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

//  Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const blogRoutes = require('./routes/blogs');
const faqRoutes = require('./routes/faqRoutes');
const contactRoutes = require('./routes/contact');

app.use('/api/auth', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/faqs', faqRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server........
app.listen(config.port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${config.port}`);
});
