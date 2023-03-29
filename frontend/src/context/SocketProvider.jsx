/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import { createContext } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';

import { actions as messagesActions } from '../store/slice/messagesSlice';
import { actions as channelActions } from '../store/slice/channelSlice';
import { actions as currentChannelIdActions } from '../store/slice/currentChannelIdSlice';

export const SocketContext = createContext({});
const socket = io();

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  const addChannel = (channelName) => {
    socket.emit('newChannel', { name: channelName }, (response) => {
      if (response.status === 'ok') {
        socket.on('newChannel', (payload) => {
          dispatch(channelActions.addChannel(payload));
          dispatch(currentChannelIdActions.setCurrentChannelId(payload.id));
        });
      }
    });
  };

  const removeChannel = (removeChannelId) => {
    socket.emit('removeChannel', removeChannelId, (response) => {
      if (response.status === 'ok') {
        socket.on('removeChannel', (payload) => {
          dispatch(channelActions
            .removeChannel(payload.id));
        });
      }
    });
  };

  const renameChannel = (renamedChannel) => {
    socket.emit('renameChannel', renamedChannel, (response) => {
      if (response.status === 'ok') {
        socket.on('renameChannel', (payload) => {
          dispatch(channelActions
            .updateChannel({ id: payload.id, changes: { name: payload.name } }));
        });
      }
    });
  };

  const sendMessage = (msg) => {
    socket.emit('newMessage', msg, (response) => {
      if (response.status === 'ok') {
        socket.on('newMessage', (payload) => {
          dispatch(messagesActions.addMessage(payload));
        });
      }
    });
  };

  return (
    <SocketContext.Provider value={{
      sendMessage,
      addChannel,
      renameChannel,
      removeChannel,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
