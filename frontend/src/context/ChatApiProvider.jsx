import React, { createContext, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { actions as messagesActions } from '../store/slice/messagesSlice';
import { actions as channelActions } from '../store/slice/channelSlice';

export const ChatApiContext = createContext({});

const ChatApiProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  const addChannel = useCallback((channelName, addChannelCb) => {
    socket.emit('newChannel', { name: channelName }, (response) => {
      addChannelCb(response);
    });
  }, [socket]);

  const removeChannel = useCallback((removeChannelId, removeChannelCb) => {
    socket.emit('removeChannel', removeChannelId, (response) => {
      removeChannelCb(response);
    });
  }, [socket]);

  const renameChannel = useCallback((renamedChannel, renameChannelCb) => {
    socket.emit('renameChannel', renamedChannel, (response) => {
      renameChannelCb(response);
    });
  }, [socket]);

  const sendMessage = useCallback((msg, newMessageCb) => {
    socket.emit('newMessage', msg, (response) => {
      newMessageCb(response);
    });
  }, [socket]);

  const memoizedContext = useMemo(() => ({
    sendMessage, addChannel, renameChannel, removeChannel,
  }), [sendMessage, addChannel, renameChannel, removeChannel]);

  socket.on('newChannel', (payload) => {
    dispatch(channelActions.addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    dispatch(channelActions.removeChannel(payload.id));
  });

  socket.on('renameChannel', (payload) => {
    dispatch(channelActions.updateChannel({ id: payload.id, changes: { name: payload.name } }));
  });

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });

  return (
    <ChatApiContext.Provider value={memoizedContext}>
      {children}
    </ChatApiContext.Provider>
  );
};

export default ChatApiProvider;
