import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { initializeBlogs } from './slices/blog';
import { Routes, Route } from 'react-router-dom';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import User from './components/User';
import Users from './components/Users';
import Navbar from './components/Navbar';
import Card from './components/Card';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  if (user === null) {
    return (
      <div className="grow flex justify-center items-center">
        <Card title="log in">
          <Notification />
          <LoginForm />
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-4 px-2 md:px-20 xl:px-40 2xl:px-60">
      <Navbar />
      <div className="mb-4" />
      <h1 className="hidden">blogs</h1>
      <Notification />
      <Routes>
        <Route path="/" element={<Blogs />}></Route>
        <Route path="/blogs/:id" element={<Blog />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/users/:id" element={<User />}></Route>
      </Routes>
      <div className="mb-4" />
    </div>
  );
};

export default App;
