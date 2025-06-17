const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
// if  we want to store some id pass as for admin
// router.post('/refresh-token', authController.refreshToken);
// router.post('/logout', authController.logout);

module.exports = router;
