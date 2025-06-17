const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const blogController = require('../controllers/blogController');
const upload = require('../middlewares/multer');
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
// const { authenticateToken, authorizeAdmin } = require('../middlewares/authMiddleware');

// router.use(authenticateToken);
// router.use(authorizeAdmin);

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', upload.single('image'), blogController.createBlog);
router.put('/:id',  upload.single('image'), updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;