const Blog = require('../models/blog');
const fs = require('fs');
const { uploadToCloudinary /*, deleteFromCloudinary */ } = require('../services/cloudinary');

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    let imageUrl = null;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.path, 'jkworks/blogs');
      imageUrl = uploadResult.url;

      try {
        fs.unlinkSync(req.file.path); // Clean up local file
      } catch (err) {
        console.warn("Temp file deletion failed:", err.message);
      }
    }

    const blog = new Blog({
      title,
      category,
      description,
      image: imageUrl,
      author: req.user ? req.user.name : "Admin",
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error("Create Blog Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    let updatedFields = { title, category, description };

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.path, 'jkworks/blogs');
      updatedFields.image = uploadResult.url;

      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.warn("Temp file deletion failed:", err.message);
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    res.json(updatedBlog);
  } catch (err) {
    console.error("Update Blog Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Future: if storing public_id, delete from Cloudinary:
    // await deleteFromCloudinary(blog.image.public_id);

    await blog.deleteOne();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error("Delete Blog Error:", err);
    res.status(500).json({ error: 'Server error while deleting blog' });
  }
};
