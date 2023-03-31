import React, { Fragment, useEffect, useState } from 'react';
import {
  Container, Row,
} from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux';

import { getData } from '../services/loaders';
import { actions as channelsActions } from '../store/slice/channelSlice';
import { actions as currentChannelIdActions } from '../store/slice/currentChannelIdSlice';
import { actions as messagesActions } from '../store/slice/messagesSlice';
import Chat from '../components/Chat';
import SideNavbar from '../components/SideNavbar';
import LoadingSpinner from '../components/LoadingSpinner';
import AddChannelModal from '../components/modals/AddChannelModal';
import RemoveChannelModal from '../components/modals/RemoveChannelModal';
import RenameChannelModal from '../components/modals/RenameChannelModal';

const MainPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        const { channels, currentChannelId, messages } = data;
        dispatch(channelsActions.addChannels(channels));
        dispatch(currentChannelIdActions.setCurrentChannelId(currentChannelId));
        dispatch(messagesActions.addMessages(messages));
        setIsLoading(true);
      } catch (e) {
        setIsLoading(false);
        throw new Error(`Error ${e}`);
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
            <SideNavbar
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
