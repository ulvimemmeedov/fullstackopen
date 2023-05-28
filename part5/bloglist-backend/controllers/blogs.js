const express = require('express');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/config');
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

const router = express.Router();

router.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

router.post('/', middleware.authUserExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;
  const user = request.authUser;

  const blog = new Blog({ title, author, url, likes, user: user._id });

  const savedBlog = await blog.save();
  user.blogs.push(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

router.put('/:id', async (request, response) => {
  const { title, author, url, likes, user } = request.body;

  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, user },
    { new: true, runValidators: true, overwrite: true }
  );

  if (blog === null) return response.status(404).end();
  response.json(blog);
});

router.delete('/:id', async (request, response) => {
  const authPayload = jwt.verify(request.authToken, JWT_SECRET);
  const blog = await Blog.findById(request.params.id);

  if (!blog) return response.status(204).end();

  if (blog.user._id.toString() !== authPayload.id)
    return response.status(403).json({ error: 'blog belongs to another user' });

  await blog.remove();
  response.status(204).end();
});

module.exports = router;
