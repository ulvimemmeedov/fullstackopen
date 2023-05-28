const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 3,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
  },
  {
    toJSON: {
      transform: (_doc, obj) => {
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;
        delete obj.passwordHash;
      },
    },
  }
);

module.exports = mongoose.model('User', schema);
