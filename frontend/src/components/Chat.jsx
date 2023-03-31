import React from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import localStorageTools from '../services/localStorageTools';

const Chat = ({ channels, currentChannelId }) => {
  const { name } = channels
    .find(({ id }) => id === currentChannelId);
  const currentMessagesCount = useSelector(({ messagesCountReducer }) => messagesCountReducer
    .messagesCount);
  const currentChannelName = ['#', name].join(' ');
  const username = localStorageTools.getUsername();

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm border-bottom  small">
          <p className="m-0">
            <b>
              {currentChannelName}
            </b>
          </p>
          <span className="text-muted m-0">
            {currentMessagesCount}
            {' '}
            сообщений
          </span>
        </div>
        <Messages
          currentChannelId={currentChannelId}
        />
        <NewMessageForm
          username={username}
          currentChannelId={currentChannelId}
        />
      </div>
    </Col>
  );
};

export default Chat;
