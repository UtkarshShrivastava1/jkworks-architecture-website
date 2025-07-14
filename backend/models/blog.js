const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String, // or 'content' if you use that
  image: {
  type: String, // secure_url
},
imagePublicId: {
  type: String, // optional if you want to delete from Cloudinary later
},

  author: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);