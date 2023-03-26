import React from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const messages = useSelector((state) => Object.values(state.messagesReducer.entities));
  return messages ? messages.map((message) => (
    <div key={message.id} className="text-break mb-2">
      <b>admin</b>
      {': '}
      {message}
    </div>
  )) : (
    null
  );
};

export default Messages;
