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

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { title, address, description, category } = req.body; // <-- add address here
    const image = req.file ? req.file.filename : null;
    const project = new Project({ title, address, description, category, image }); // <-- add address here
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // If a new image is uploaded, delete the old one
    if (req.file) {
      if (project.image) {
        const oldImagePath = path.join(__dirname, '..', 'uploads', project.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      project.image = req.file.filename;
    }

    // Update other fields
    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.category = req.body.category || project.category;

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // Delete image file if exists
    if (project.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', project.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await project.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};