/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext } from 'react';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';

import { actions as messagesActions } from '../store/slice/messagesSlice';
import { actions as channelActions } from '../store/slice/channelSlice';
import { actions as currentChannelIdActions } from '../store/slice/currentChannelIdSlice';

export const SocketContext = createContext({});

const SocketProvider = ({ children, socket }) => {
  const rollbar = useRollbar();
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
        toast.success(t('toast.create'));
      } else {
        toast.error(t('toast.error'));
        rollbar.error(t('rollbar.newChannel'));
      }
    });
  };

  const removeChannel = (removeChannelId) => {
    socket.emit('removeChannel', removeChannelId, (response) => {
      if (response.status === 'ok') {
        toast.success(t('toast.remove'));
      } else {
        toast.error(t('toast.error'));
        rollbar.error(t('rollbar.removeChannel'));
      }
    });
  };

  const renameChannel = (renamedChannel) => {
    socket.emit('renameChannel', renamedChannel, (response) => {
      if (response.status === 'ok') {
        toast.success(t('toast.rename'));
      } else {
        toast.error(t('toast.error'));
        rollbar.error(t('rollbar.renameChannel'));
      }
    });
  };

  const sendMessage = (msg) => {
    socket.emit('newMessage', msg, (response) => {
      if (response.status !== 'ok') {
        toast.error(t('toast.error'));
        rollbar.error(t('rollbar.newMeassage'));
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
