const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectsByCategory = async (req, res) => {
  try {
    const projects = await Project.find({ category: req.params.category });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new project (supports multiple images and key details)
exports.createProject = async (req, res) => {
  try {
    const { title, address, description, category, carpetArea, constructionArea } = req.body;
    const images = req.files ? req.files.map(file => file.filename) : [];
    const project = new Project({
      title,
      address,
      description,
      category,
      carpetArea,
      constructionArea,
      images,
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a project (supports multiple images and key details)
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // If new images are uploaded, delete old images and update
    if (req.files && req.files.length > 0) {
      // Delete old images from disk
      if (project.images && Array.isArray(project.images)) {
        project.images.forEach(img => {
          const imgPath = path.join(__dirname, '..', 'uploads', img);
          if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        });
      }
      project.images = req.files.map(file => file.filename);
    }

    // Update other fields
    project.title = req.body.title || project.title;
    project.address = req.body.address || project.address;
    project.description = req.body.description || project.description;
    project.category = req.body.category || project.category;
    project.carpetArea = req.body.carpetArea || project.carpetArea;
    project.constructionArea = req.body.constructionArea || project.constructionArea;

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a project (delete all images)
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // Delete all images from disk
    if (project.images && Array.isArray(project.images)) {
      project.images.forEach(img => {
        const imgPath = path.join(__dirname, '..', 'uploads', img);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      });
    }

    await project.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};