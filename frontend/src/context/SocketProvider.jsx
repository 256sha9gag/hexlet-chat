/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext } from 'react';
import { useDispatch } from 'react-redux';

import { actions as messagesActions } from '../store/slice/messagesSlice';
import { actions as channelActions } from '../store/slice/channelSlice';
import { actions as currentChannelIdActions } from '../store/slice/currentChannelIdSlice';

export const SocketContext = createContext({});

const SocketProvider = ({ children, socket }) => {
  console.log(socket, 'socket');
  const dispatch = useDispatch();

  socket.on('newChannel', (payload) => {
    dispatch(channelActions.addChannel(payload));
    dispatch(currentChannelIdActions.setCurrentChannelId(payload.id));
  });

  socket.on('removeChannel', (payload) => {
    dispatch(channelActions
      .removeChannel(payload.id));
  });

  socket.on('renameChannel', (payload) => {
    dispatch(channelActions
      .updateChannel({ id: payload.id, changes: { name: payload.name } }));
  });

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });

  const addChannel = (channelName) => {
    socket.emit('newChannel', { name: channelName }, (response) => {
      if (response.status === 'ok') {
        console.log(response.status);
      }
    });
  };

  const removeChannel = (removeChannelId) => {
    socket.emit('removeChannel', removeChannelId, (response) => {
      if (response.status === 'ok') {
        console.log(response.status);
      }
    });
  };

  const renameChannel = (renamedChannel) => {
    socket.emit('renameChannel', renamedChannel, (response) => {
      if (response.status === 'ok') {
        console.log(response.status);
      }
    });
  };

  const sendMessage = (msg) => {
    socket.emit('newMessage', msg, (response) => {
      if (response.status === 'ok') {
        console.log(response.status);
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
