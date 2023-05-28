const bcrypt = require('bcrypt');
const express = require('express');

const { BCRYPT_SALT_OR_ROUNDS } = require('../utils/config');
const User = require('../models/user');

const router = express.Router();

router.get('/', async (_request, response) =>
  response.json(
    await User.find({}).populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
    })
  )
);

router.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 3)
    return response.status(400).json({
      error: 'password must contain at least 3 characters',
    });

  const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_OR_ROUNDS);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = router;
