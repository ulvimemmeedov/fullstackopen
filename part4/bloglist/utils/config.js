require('dotenv').config();

const BCRYPT_SALT_OR_ROUNDS = 10;

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const PORT = process.env.PORT || 3003;

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  BCRYPT_SALT_OR_ROUNDS,
  JWT_SECRET,
  MONGODB_URI,
  PORT,
};
