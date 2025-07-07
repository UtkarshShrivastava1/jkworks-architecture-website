const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer'); 

const {
  getProjects,
  getProjectById,
  getProjectsByCategory,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

// Use the shared upload middleware
router.post('/', upload.array('images', 5), createProject);
router.put('/:id', upload.array('images', 5), updateProject);

router.get('/', getProjects);
router.get('/category/:category', getProjectsByCategory);
router.get('/:id', getProjectById);
router.delete('/:id', deleteProject);

module.exports = router;