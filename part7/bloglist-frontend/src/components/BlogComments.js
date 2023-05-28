import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BlogCommentForm from './BlogCommentForm';
import Card from './Card';

const BlogComments = () => {
  const { id } = useParams();
  const { comments } = useSelector(({ blogs }) =>
    blogs.find((blog) => blog.id === id)
  );

  return (
    <>
      <h3 className="text-xl mb-2">comments</h3>
      <BlogCommentForm id={id} />
      <div className="mb-4" />
      <div className="grid gap-3">
        {comments?.map((comment, index) => (
          <Card key={index}>{comment}</Card>
        ))}
      </div>
      {!comments?.length && (
        <p className="text-slate-500">no comments to display</p>
      )}
    </>
  );
};

export default BlogComments;
