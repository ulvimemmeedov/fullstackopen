require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const PORT = process.env.PORT || 4000;

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  JWT_SECRET,
  MONGODB_URI,
  PORT,
};
