const dummy = (_blogs) => 1;

const favoriteBlog = (blogs) =>
  blogs.length
    ? blogs.reduce((favorite, current) =>
        current.likes > favorite.likes ? current : favorite
      )
    : null;

const mostBase = (type, blogs, callback) => {
  if (!blogs.length) return null;

  let counts = {};

  blogs.forEach((blog) => callback(blog, counts));

  const highestCount = Object.entries(counts).reduce((selected, current) =>
    current[1] > selected[1] ? current : selected
  );

  return {
    author: highestCount[0],
    [type]: highestCount[1],
  };
};

const mostBlogs = (blogs) =>
  mostBase(
    'blogs',
    blogs,
    (blog, counts) => (counts[blog.author] = (counts[blog.author] ?? 0) + 1)
  );

const mostLikes = (blogs) =>
  mostBase(
    'likes',
    blogs,
    (blog, counts) =>
      (counts[blog.author] = (counts[blog.author] ?? 0) + blog.likes)
  );

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes,
};
