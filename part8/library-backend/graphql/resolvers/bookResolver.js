const { AuthenticationError } = require('apollo-server-core');
const { handleDatabaseError } = require('../../utils/errors');
const Author = require('../../models/author');
const Book = require('../../models/book');
const pubsub = require('../pubsub');

const BOOK_ADDED_TOPIC = 'BOOK_ADDED';

module.exports = {
  Mutation: {
    addBook: async (
      _root,
      { author: name, genres, published, title },
      { authUser }
    ) => {
      if (!authUser) throw new AuthenticationError('unauthenticated');

      let author = await Author.findOne({ name });

      if (!author) {
        author = new Author({ name });
        await author.save().catch(handleDatabaseError);
      }

      const book = new Book({ author, genres, published, title });
      await book.save().catch(handleDatabaseError);

      author.books.push(book);
      await author.save();

      pubsub.publish(BOOK_ADDED_TOPIC, { bookAdded: book });

      return book;
    },
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (_root, { author, genre }) => {
      let filter = {};
      if (author) filter.author = await Author.findOne({ name: author });
      if (genre) filter.genres = genre;
      return Book.find(filter);
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(BOOK_ADDED_TOPIC),
    },
  },
  Book: {
    author: async (parent) => {
      await parent.populate('author');
      return parent.author;
    },
  },
};
