import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (notification === null) return;

  return <div style={style}>{notification}</div>;
};

export default connect((state) => ({ notification: state.notification }))(
  Notification
);
