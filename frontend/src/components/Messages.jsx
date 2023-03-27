/* eslint-disable functional/no-expression-statements */
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { actions as messagesCountActions } from '../store/slice/messagesCountSlice';

const Messages = ({ currentChannelId }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => Object.values(state.messagesReducer.entities));
  const currentChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const channelMessagesCount = currentChannelMessages.length;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(messagesCountActions.setMessagesCount(channelMessagesCount));
    const messagesEnd = messagesEndRef.current;
    messagesEnd.scrollIntoView({ block: 'end' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChannelId, channelMessagesCount]);

  return (channelMessagesCount !== 0) ? (
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
