const jwt = require('jsonwebtoken');
const config = require('../config/config');

let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, config.jwtSecret, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, config.jwtRefreshSecret, { expiresIn: '7d' });
};

const dotenv = require('dotenv');
dotenv.config();

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  // Only allow admin login
  if (email === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD) {
    const adminUser = {
      _id: 'admin-id',
      email: process.env.ADMIN_ID,
      role: 'admin',
    };
    const accessToken = generateAccessToken(adminUser);
    const refreshToken = generateRefreshToken(adminUser);
    refreshTokens.push(refreshToken);
    return res.json({ accessToken, refreshToken });
  }

  // No user login allowed
  return res.status(401).json({ message: 'Invalid credentials' });
};