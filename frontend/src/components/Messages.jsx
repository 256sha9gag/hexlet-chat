import React, { useRef, useEffect } from 'react';

const Messages = ({ currentChannelId, currentChannelMessages }) => {
  const messagesEndRef = useRef();

  useEffect(() => {
    const messagesEnd = messagesEndRef.current;
    if (messagesEnd) {
      messagesEnd.scrollIntoView({ block: 'end' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChannelId, currentChannelMessages]);

  return (currentChannelMessages.length !== 0) ? (
    <div className="px-5 overflow-auto h-auto">
      {currentChannelMessages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <p>
            <b>{message.username}</b>
            {': '}
            {message.body}
          </p>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  ) : (
    <div className="px-5 overflow-auto" />
  );
};

export default Messages;
