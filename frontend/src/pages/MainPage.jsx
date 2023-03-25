/* eslint-disable functional/no-expression-statements */
import React, { useEffect } from 'react';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux';

import loadData from '../services/loader';
import { actions as channelsActions } from '../store/slice/channelSlice';

const renderChannel = (channel) => {
  const { name } = channel;
  return (
    <li key={channel.id}>
      {name}
    </li>
  );
};

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadData();
      const { channels } = data;
      dispatch(channelsActions.addChannels(channels));
    };

    fetchData();
  }, [dispatch]);

  const channels = useSelector((state) => Object.values(state.channelsReducer.entities));
  console.log(channels, 'channels');

  return (
    <Container className="h-100 my-5 overflow-hidden rounded">
      <Row className="h-100 bg-light">
        <Col className="col-4 col-md-2 border-end d-flex flex-column p-0">
          <div className="d-flex ps-4 pe-4 my-4 border-bottom justify-content-between">
            <b>Channels</b>
            <Button
              variant=""
              className="p-0 mb-4 text-primary btn-group-vertical"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </Button>
          </div>
          <ul>
            {
              channels && channels.map((channel) => renderChannel(channel))
            }
          </ul>
        </Col>
        <Col className="">2 of 3</Col>
      </Row>
    </Container>
  );
};

export default MainPage;
