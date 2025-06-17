const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require('./config/config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

// Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const blogRoutes = require('./routes/blogs');
const contactRoutes = require('./routes/contact');


app.use('/api/auth', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${config.port}`);
});
