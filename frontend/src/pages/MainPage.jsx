/* eslint-disable functional/no-expression-statements */
import React, { useEffect, useState } from 'react';
import {
  Container, Row,
} from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch } from 'react-redux';

import loadData from '../services/loader';
import { actions as channelsActions } from '../store/slice/channelSlice';
import { actions as currentChannelIdActions } from '../store/slice/currentChannelIdSlice';
import { actions as messagesActions } from '../store/slice/messagesSlice';
import Chat from '../components/Chat';
import SideNavBar from '../components/SideNavBar';
import LoadingSpinner from '../components/LoadingSpinner';

const MainPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadData();
        const { channels, currentChannelId, messages } = data;
        dispatch(channelsActions.addChannels(channels));
        dispatch(currentChannelIdActions.setCurrentChannelId(currentChannelId));
        dispatch(messagesActions.addMessages(messages));
        setIsLoading(true);
      } catch (e) {
        setIsLoading(false);
        throw new Error(`Error ${e}`);
      }
      const data = await loadData();
      const { channels, currentChannelId } = data;
      dispatch(channelsActions.addChannels(channels));
      dispatch(currentChannelIdActions.setCurrentChannelId(currentChannelId));
    };

    fetchData();
  }, [dispatch]);

  return (
    <Container className="h-100 my-5 overflow-hidden rounded">
      {isLoading ? (
        <Row className="h-100 bg-white">
          <SideNavBar />
          <Chat />
        </Row>
      ) : (
        <LoadingSpinner />
      )}
    </Container>
  );
};

export default MainPage;
