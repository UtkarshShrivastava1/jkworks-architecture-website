const Blog = require('../models/blog');
const fs = require('fs');

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

exports.getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
};

exports.createBlog = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    const image = req.file ? req.file.filename : null;
    const blog = new Blog({
      title,
      category,
      description,
      image,
      author: req.user ? req.user.name : "Admin"
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    let updatedFields = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
    };

    // If updating with a new image (multipart/form-data)
    if (req.file) {
      updatedFields.image = req.file.filename;

      // Remove old image if exists
      const oldBlog = await Blog.findById(req.params.id);
      if (oldBlog && oldBlog.image) {
        const oldImagePath = `uploads/${oldBlog.image}`;
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.image) fs.unlinkSync(`uploads/${blog.image}`);
  await blog.deleteOne();
  res.json({ message: 'Deleted' });
};