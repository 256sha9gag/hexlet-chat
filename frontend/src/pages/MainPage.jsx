import React, { useEffect, useState } from 'react';
import {
  Container, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRollbar } from '@rollbar/react';

import routes from '../routes';
import { actions as channelsActions } from '../store/slice/channelSlice';
import { actions as currentChannelIdActions } from '../store/slice/currentChannelIdSlice';
import { actions as messagesActions } from '../store/slice/messagesSlice';
import SideBar from '../components/SideBar';
import Chat from '../components/Chat';
import LoadingSpinner from '../components/LoadingSpinner';
import AddChannelModal from '../components/modals/AddChannelModal';
import RemoveChannelModal from '../components/modals/RemoveChannelModal';
import RenameChannelModal from '../components/modals/RenameChannelModal';
import useAuth from '../hooks/authContext';

const MainPage = () => {
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.usersPath(), { headers: useAuth.getAuthHeader() });
        const { channels, currentChannelId, messages } = response.data;
        dispatch(channelsActions.addChannels(channels));
        dispatch(currentChannelIdActions.setCurrentChannelId(currentChannelId));
        dispatch(messagesActions.addMessages(messages));
        setIsLoading(true);
      } catch (e) {
        setIsLoading(false);
        rollbar.error(t('rollbar.getData'), e);
        toast.error(t('toast.error'));
        throw e;
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const channels = useSelector((state) => Object.values(state.channelsReducer.entities));
  const currentChannelId = useSelector(({ currentChannelIdReducer }) => currentChannelIdReducer
    .currentChannelId);
  const modal = useSelector(({ modalReducer }) => modalReducer.modalAction);
  const channelsNames = channels.map((channel) => channel.name);

  const modalActions = {
    addChannel: <AddChannelModal channelsNames={channelsNames} />,
    removeChannel: <RemoveChannelModal />,
    renameChannel: <RenameChannelModal channelsNames={channelsNames} />,
    disableShow: null,
  };

  const getModal = (action) => modalActions[action];

  return (
    <Container className="h-100 my-5 overflow-hidden rounded">
      {isLoading ? (
        <>
          <Row className="h-100 bg-white">
            <SideBar
              channels={channels}
              currentChannelId={currentChannelId}
            />
            <Chat
              channels={channels}
              currentChannelId={currentChannelId}
            />
          </Row>
          {getModal(modal)}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </Container>
  );
};

export default MainPage;
