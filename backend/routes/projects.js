const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getProjects,
  getProjectById,
  getProjectsByCategory, // <-- use controller
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save to /uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});
const upload = multer({ storage: storage });

// multer for project creation and update
router.post('/', upload.single('image'), createProject);

router.get('/', getProjects);
router.get('/category/:category', getProjectsByCategory); // <-- use controller
router.get('/:id', getProjectById);
router.put('/:id', upload.single('image'), updateProject); // <-- allow image update
router.delete('/:id', deleteProject);

module.exports = router;