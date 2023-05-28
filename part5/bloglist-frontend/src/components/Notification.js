import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, type, index }) => {
  const [visible, setVisible] = useState(false);
  const timeoutId = useRef(null);

  useEffect(() => {
    if (message !== null) {
      clearTimeout(timeoutId.current);
      setVisible(true);
      timeoutId.current = setTimeout(() => setVisible(false), 5000);
    }

    return () => clearTimeout(timeoutId.current);
  }, [message, index]);

  if (!visible) return null;

  return <div className={`notification ${type}`}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Notification;
