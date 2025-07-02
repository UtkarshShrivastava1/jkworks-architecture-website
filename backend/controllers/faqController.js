const FAQ = require('../models/faq');

// Get all FAQs
exports.getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch FAQs.' });
  }
};

// Create FAQ
exports.createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const faq = new FAQ({ question, answer });
    await faq.save();
    res.json({ success: true, faq });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create FAQ.' });
  }
};

// Update FAQ
exports.updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const faq = await FAQ.findByIdAndUpdate(id, { question, answer }, { new: true });
    res.json({ success: true, faq });
  } catch (err) {
    res.status(400).json({ message: 'Failed to update FAQ.' });
  }
};

// Delete FAQ
exports.deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    await FAQ.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete FAQ.' });
  }
};