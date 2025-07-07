const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  address: String,
  description: String,
  category: String,
   carpetArea: String,        
  constructionArea: String,   
  images: [String], 
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);