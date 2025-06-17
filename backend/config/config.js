const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: process.env.DEV_PORT || 5000,
    dbUri: process.env.DEV_DB_URI,
    jwtSecret: process.env.DEV_JWT_SECRET,
    jwtRefreshSecret: process.env.DEV_JWT_REFRESH_SECRET,
  },
  production: {
    port: process.env.PROD_PORT || 8000,
    dbUri: process.env.PROD_DB_URI,
    jwtSecret: process.env.PROD_JWT_SECRET,
    jwtRefreshSecret: process.env.PROD_JWT_REFRESH_SECRET,
  },
};

module.exports = config[env];
