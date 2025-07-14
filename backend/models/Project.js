const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  address: String,
  description: String,
  category: String,
   carpetArea: String,        
  constructionArea: String,   
  images: {
  type: [String],
  default: [],
},
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);