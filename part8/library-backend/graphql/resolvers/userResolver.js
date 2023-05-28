const { handleDatabaseError } = require('../../utils/errors');
const User = require('../../models/user');

module.exports = {
  Mutation: {
    createUser: async (_root, { username, favouriteGenre }) => {
      const user = new User({ username, favouriteGenre });
      return user.save().catch(handleDatabaseError);
    },
  },
  Query: {
    me: (_root, _args, { authUser }) => authUser,
  },
};
