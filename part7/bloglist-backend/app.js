const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');

const authRouter = require('./controllers/auth');
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const userRouter = require('./controllers/users');

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(middleware.authTokenExtractor);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use('/api/auth', authRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);

app.use(middleware.errorHandler);

module.exports = app;
