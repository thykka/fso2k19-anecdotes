import React from 'react';

const Notification = (props) => {
  const { notification } = props.store.getState();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };
  return (
    <div>
      {
        notification.visible
          ? <p style={style}>{ notification.message }</p>
          : ''
      }
    </div>
  );
};

export default Notification
