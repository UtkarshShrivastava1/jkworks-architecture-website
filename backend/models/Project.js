const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  address: String,
  description: String,
  image: String,
  category: String,
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);