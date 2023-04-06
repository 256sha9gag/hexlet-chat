import React from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import localStorageTools from '../services/localStorageTools';

const Chat = ({ currentChannelId, currentChannelMessages, currentChannelName }) => {
  const { t } = useTranslation();
  const channelName = ['#', currentChannelName].join(' ');
  const username = localStorageTools.getUsername();

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm border-bottom small">
          <p className="m-0">
            <b>
              {channelName}
            </b>
          </p>
          <span className="text-muted m-0">
            {t('chat.сounter.count', { count: currentChannelMessages.length })}
          </span>
        </div>
        <Messages
          currentChannelId={currentChannelId}
          currentChannelMessages={currentChannelMessages}
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
