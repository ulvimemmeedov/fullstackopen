import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  if (notification === null) return null;
  const { type, message } = notification;

  return (
    <div
      className={`p-2 rounded mb-4 ${
        type === 'success' && 'bg-green-300 text-green-700'
      } ${type === 'error' && 'bg-red-300 text-red-700'}`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Notification;
