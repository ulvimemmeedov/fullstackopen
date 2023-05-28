const { UserInputError } = require('apollo-server-core');
const { JWT_SECRET } = require('../../utils/config');
const User = require('../../models/user');

module.exports = {
  Mutation: {
    login: async (_root, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user || password !== 'hunter2')
        throw new UserInputError('invalid credentials');

      return { value: jwt.sign({ id: user._id }, JWT_SECRET) };
    },
  },
};
