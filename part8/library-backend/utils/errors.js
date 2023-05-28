const { UserInputError } = require('apollo-server-core');

const handleDatabaseError = (error) => {
  if (error.name === 'ValidationError')
    throw new UserInputError(error.message, {
      invalidArgs: Object.keys(error.errors).map((k) => error.errors[k].path),
    });
  else if (
    error.name === 'MongoServerError' &&
    error.code === 11000 // duplicate key
  )
    throw new UserInputError(error.message, {
      invalidArgs: Object.keys(error.keyPattern),
    });

  throw error;
};

module.exports = {
  handleDatabaseError,
};
