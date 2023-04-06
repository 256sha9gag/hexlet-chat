import React, { createContext, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';

import { actions as messagesActions } from '../store/slice/messagesSlice';
import { actions as channelActions } from '../store/slice/channelSlice';
import { actions as currentChannelIdActions } from '../store/slice/currentChannelIdSlice';

export const ChatApiContext = createContext({});

const ChatApiProvider = ({ children, socket }) => {
  const rollbar = useRollbar();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const addChannel = useCallback((channelName) => {
    socket.emit('newChannel', { name: channelName }, (response) => {
      if (response.status === 'ok') {
        toast.success(t('toast.create'));
      } else {
        toast.error(t('toast.error'));
        rollbar.error(t('rollbar.newChannel'));
      }
    });
  }, [t, rollbar, socket]);

  const removeChannel = useCallback((removeChannelId) => {
    socket.emit('removeChannel', removeChannelId, (response) => {
      if (response.status === 'ok') {
        toast.success(t('toast.remove'));
      } else {
        toast.error(t('toast.error'));
        rollbar.error(t('rollbar.removeChannel'));
      }
    });
  }, [t, rollbar, socket]);

  const renameChannel = useCallback((renamedChannel) => {
    socket.emit('renameChannel', renamedChannel, (response) => {
      if (response.status === 'ok') {
        toast.success(t('toast.rename'));
      } else {
        toast.error(t('toast.error'));
        rollbar.error(t('rollbar.renameChannel'));
      }
    });
  }, [t, rollbar, socket]);

  const sendMessage = useCallback((msg) => {
    socket.emit('newMessage', msg, (response) => {
      if (response.status !== 'ok') {
        toast.error(t('toast.error'));
        rollbar.error(t('rollbar.newMeassage'));
      }
    });
  }, [t, rollbar, socket]);

  const memoizedContext = useMemo(() => ({
    sendMessage, addChannel, renameChannel, removeChannel,
  }), [sendMessage, addChannel, renameChannel, removeChannel]);

  socket.on('newChannel', (payload) => {
    dispatch(channelActions.addChannel(payload));
    dispatch(currentChannelIdActions.setCurrentChannelId(payload.id));
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
