/* eslint-disable functional/no-expression-statements */
import React from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Messages from './Messages';
import NewMessageForm from './NewMessageForm';

const Chat = () => {
  const channels = useSelector((state) => Object.values(state.channelsReducer.entities));
  const currentChannelId = useSelector(({ currentChannelIdReducer }) => currentChannelIdReducer
    .currentChannelId);
  const currentChannel = channels
    .find(({ id }) => id === currentChannelId);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm border-bottom  small">
          <p className="m-0">
            <b>
              {['#', currentChannel.name].join(' ')}
            </b>
          </p>
          <span className="text-muted m-0">0 сообщений</span>
        </div>
        <div className="px-5 overflow-auto">
          <Messages />
        </div>
        <NewMessageForm />
      </div>
    </Col>
  );
};

export default Chat;
