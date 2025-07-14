const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  category: String,
  tags: [String], // <-- NEW field
  description: String,
  image: {
    type: String, // secure_url
  },
  imagePublicId: {
    type: String,
  },
  link: {
    type: String, // <-- NEW optional field
  },
  author: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);
