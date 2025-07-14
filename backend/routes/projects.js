const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const { uploadToCloudinary } = require('../services/cloudinary');
const fs = require('fs');
const Project = require('../models/Project');

// Helper to delete local file
const deleteLocalFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) console.error("⚠️ Failed to delete local file:", err.message);
  });
};

// @desc    Create a new project
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { title, address, description, category, carpetArea, constructionArea } = req.body;

    const images = [];
    if (req.files?.length > 0) {
      for (const file of req.files) {
        try {
          const result = await uploadToCloudinary(file.path, 'projects');
          if (result?.url) {
            images.push(result.url);
          }
        } catch (err) {
          console.error("❌ Cloudinary upload failed:", err.message);
        } finally {
          deleteLocalFile(file.path);
        }
      }
    }

    if (images.length === 0) {
      return res.status(400).json({ error: 'At least one image is required.' });
    }

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
  } catch (error) {
    console.error('❌ Project creation error:', error.message);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// @desc    Update existing project
router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    const { title, address, description, category, carpetArea, constructionArea } = req.body;

    let images = [];
    if (req.files?.length > 0) {
      for (const file of req.files) {
        try {
          const result = await uploadToCloudinary(file.path, 'projects');
          if (result?.url) {
            images.push(result.url);
          }
        } catch (err) {
          console.error("❌ Cloudinary upload failed:", err.message);
        } finally {
          deleteLocalFile(file.path);
        }
      }
    }

    const updateData = {
      title,
      address,
      description,
      category,
      carpetArea,
      constructionArea,
    };
    if (images.length > 0) {
      updateData.images = images;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error('❌ Project update error:', error.message);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// @desc    Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// @desc    Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// @desc    Get projects by category
router.get('/category/:category', async (req, res) => {
  try {
    const projects = await Project.find({ category: req.params.category }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch by category' });
  }
});

// @desc    Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
