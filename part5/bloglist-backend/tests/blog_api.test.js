const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./blog_api_test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Promise.all(helper.initialBlogs.map((blog) => new Blog(blog).save()));
});

describe('indexing blogs', () => {
  test('media type is JSON', () =>
    api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/));

  test('all blogs are present', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('identifier property is not prefixed with an underscore', async () => {
    const blog = (await api.get('/api/blogs')).body[0];
    expect(blog._id).toBeUndefined();
    expect(blog.id).toBeDefined();
  });
});

describe('creating a blog', () => {
  let user;
  beforeEach(async () => (user = await helper.initUsers()));

  test('succeeds with valid data', async () => {
    await api
      .post('/api/blogs')
      .set(helper.authorizationHeader(user))
      .send(helper.exampleBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const finalBlogs = await helper.blogsInDb();
    expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1);
    expect(finalBlogs.map((blog) => blog.title)).toContain(
      helper.exampleBlog.title
    );
  });

  test('likes property is set to 0 by default', async () => {
    const response = await api
      .post('/api/blogs')
      .set(helper.authorizationHeader(user))
      .send(helper.exampleBlog)
      .expect(201);

    expect(response.body.likes).toEqual(0);
  });

  test('fails with missing properties', () =>
    api
      .post('/api/blogs')
      .set(helper.authorizationHeader(user))
      .send({})
      .expect(400));

  test('fails if missing an auth token', () =>
    api.post('/api/blogs').send(helper.exampleBlog).expect(401));
});

describe('updating a blog', () => {
  test('succeeds with a valid ID and data', async () => {
    const initialBlog = await Blog.findOne({
      title: { $ne: helper.exampleBlog.title },
    });

    await api
      .put(`/api/blogs/${initialBlog.id}`)
      .send(helper.exampleBlog)
      .expect(200);

    const blog = await Blog.findById(initialBlog.id);

    for (const key of Object.keys(helper.exampleBlog))
      expect(blog[key]).toEqual(helper.exampleBlog[key]);
  });

  test('fails with an invalid ID', async () =>
    api
      .put(`/api/blogs/${await helper.nonExistingId()}`)
      .send(helper.exampleBlog)
      .expect(404));

  test('fails with missing properties', async () => {
    const initialBlog = await Blog.findOne({});
    await api.put(`/api/blogs/${initialBlog.id}`).send({}).expect(400);
  });
});

describe('deleting a blog', () => {
  let user;
  beforeEach(async () => (user = await helper.initUsers()));

  test('succeeds with a valid ID', async () => {
    const blog = await Blog.create({ ...helper.exampleBlog, user: user._id });

    await api
      .delete(`/api/blogs/${blog.id}`)
      .set(helper.authorizationHeader(user))
      .expect(204);

    expect((await helper.blogsInDb()).map((b) => b.id)).not.toContain(blog.id);
  });
});

afterAll(() => mongoose.connection.close());
