const { AuthenticationError } = require('apollo-server-core');
const Author = require('../../models/author');

module.exports = {
  Mutation: {
    editAuthor: async (_root, { name, setBornTo }, { authUser }) => {
      if (!authUser) throw new AuthenticationError('unauthenticated');

      return Author.findOneAndUpdate(
        { name },
        { born: setBornTo },
        { new: true }
      );
    },
  },
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async ({ books }) => books.length,
  },
};
