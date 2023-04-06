import React, { useEffect, useState } from 'react';
import {
  Container, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRollbar } from '@rollbar/react';

import routes from '../../routes';
import { actions as channelsActions } from '../../store/slice/channelSlice';
import { actions as messagesActions } from '../../store/slice/messagesSlice';
import SideBar from '../SideBar';
import Chat from '../Chat';
import LoadingSpinner from '../LoadingSpinner';
import GeneralModal from '../modals/GeneralModal';
import useAuth from '../../hooks/authContext';

const MainPage = () => {
  const auth = useAuth();
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.usersPath(), { headers: auth.getAuthHeader() });
        const { channels, currentChannelId, messages } = response.data;
        dispatch(channelsActions.addChannels(channels));
        dispatch(channelsActions.setCurrentChannelId(currentChannelId));
        dispatch(messagesActions.addMessages(messages));
        setIsLoaded(true);
      } catch (e) {
        setIsLoaded(false);
        rollbar.error(t('rollbar.getData'), e);
        toast.error(t('toast.error'));
        throw e;
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const channels = useSelector((state) => Object.values(state.channelsReducer.entities));
  const currentChannelId = useSelector((state) => state
    .channelsReducer.currentChannelId);
  const channelsNames = channels.map((channel) => channel.name);
  const allMessages = useSelector((state) => Object.values(state.messagesReducer.entities));
  const currentChannelMessages = allMessages
    .filter(({ channelId }) => channelId === currentChannelId);
  const currentChannel = channels.find(({ id }) => id === currentChannelId);

  return (
    <Container className="h-100 my-5 overflow-hidden rounded">
      {isLoaded ? (
        <>
          <Row className="h-100 bg-white">
            <SideBar
              channels={channels}
              currentChannelId={currentChannelId}
            />
            <Chat
              currentChannelMessages={currentChannelMessages}
              currentChannelId={currentChannelId}
              currentChannelName={currentChannel.name}
            />
          </Row>
          <GeneralModal channelsNames={channelsNames} />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </Container>
  );
};

export default MainPage;
