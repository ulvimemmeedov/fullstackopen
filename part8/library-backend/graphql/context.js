const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const User = require('../models/user');

const context = async ({ req }) => {
  const auth = req?.headers?.authorization;
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const { id } = jwt.verify(auth.substring(7), JWT_SECRET);
    const authUser = await User.findById(id);
    return { authUser };
  }
};

module.exports = context;
