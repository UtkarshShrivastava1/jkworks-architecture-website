const Project = require('../models/Project');
const fs = require('fs');
const { uploadToCloudinary } = require('../services/cloudinary');

// 🔹 Helper to delete local file
const deleteLocalFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) console.error("⚠️ Failed to delete local file:", err.message);
  });
};

// 🔹 Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("❌ Error fetching projects:", err.message);
    res.status(500).json({ error: 'Failed to fetch projects.' });
  }
};

// 🔹 Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error("❌ Error fetching project:", err.message);
    res.status(500).json({ error: 'Failed to fetch project.' });
  }
};

// 🔹 Get projects by category
exports.getProjectsByCategory = async (req, res) => {
  try {
    const projects = await Project.find({ category: req.params.category }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("❌ Error fetching category projects:", err.message);
    res.status(500).json({ error: 'Failed to fetch category projects.' });
  }
};

// 🔹 Create new project
exports.createProject = async (req, res) => {
  try {
    const { title, address, description, category, carpetArea, constructionArea } = req.body;

    if (!title || !address || !description || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const images = [];

    if (req.files?.length > 0) {
      for (const file of req.files) {
        try {
          const result = await uploadToCloudinary(file.path, 'projects');
          console.log("Cloudinary upload result:", result);
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

    // If no images were uploaded successfully, return an error
    if (req.files?.length > 0 && images.length === 0) {
      return res.status(500).json({ error: 'Image upload failed. No images were saved.' });
    }

    // Extra safety: do not allow project without images
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
    console.log("✅ Project saved:", project);
    res.status(201).json(project);
  } catch (err) {
    console.error("❌ Failed to create project:", err.message);
    res.status(500).json({ error: 'Failed to create project.' });
  }
};
// 🔹 Update project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // 🔄 Replace images if new ones are uploaded
    if (req.files?.length > 0) {
      const newImages = [];
      for (const file of req.files) {
        try {
          const result = await uploadToCloudinary(file.path, 'projects');
          if (result?.url) {
            newImages.push(result.url);
          }
        } catch (err) {
          console.error('❌ Image upload failed:', err.message);
        } finally {
          deleteLocalFile(file.path);
        }
      }
      // Only update images if at least one was uploaded successfully
      if (newImages.length > 0) {
        project.images = newImages;
      }
    }

    // 📝 Update fields
    const fields = ['title', 'address', 'description', 'category', 'carpetArea', 'constructionArea'];
    fields.forEach((field) => {
      if (req.body[field]) {
        project[field] = req.body[field];
      }
    });

    await project.save();
    console.log("✅ Project updated:", project);
    res.json(project);
  } catch (err) {
    console.error("❌ Failed to update project:", err.message);
    res.status(500).json({ error: 'Failed to update project.' });
  }
};

// 🔹 Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // Optional: delete from Cloudinary if you store public_id

    await project.deleteOne();
    console.log("🗑️ Project deleted:", project._id);
    res.json({ message: 'Project deleted successfully.' });
  } catch (err) {
    console.error("❌ Failed to delete project:", err.message);
    res.status(500).json({ error: 'Failed to delete project.' });
  }
};
