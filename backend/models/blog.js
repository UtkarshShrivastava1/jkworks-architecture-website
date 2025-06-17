const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String, // or 'content' if you use that
  image: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);