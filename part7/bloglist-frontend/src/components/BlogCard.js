import { Link } from 'react-router-dom';
import Card from './Card';

const BlogCard = ({ blog }) => (
  <Link to={`/blogs/${blog.id}`}>
    <Card>
      <div className="flex justify-between items-center gap-2">
        <div>
          <p className="font-serif">{blog.title}</p>
          <p className="mt-1 text-xs text-slate-400">{blog.author}</p>
        </div>
        <p className="text-xl text-slate-400">{blog.likes}</p>
      </div>
    </Card>
  </Link>
);

export default BlogCard;
