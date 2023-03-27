/* eslint-disable functional/no-expression-statements */
import React from 'react';
import {
  Col, Button,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { actions as currentChannelIdActions } from '../store/slice/currentChannelIdSlice';

const RenderChannels = (channel, currentChannelId) => {
  const { name, removable, id } = channel;
  const activeButton = id === currentChannelId ? 'secondary' : null;
  const dispatch = useDispatch();

  const handleClick = (newCurrentId) => {
    dispatch(currentChannelIdActions.setCurrentChannelId(newCurrentId));
  };

  return (
    removable
      ? (
        <li className="nav-item w-100" key={id}>
          {null}
        </li>
      )
      : (
        <li className="nav-item w-100 " key={id}>
          <Button
            variant={activeButton}
            onClick={() => handleClick(id)}
            className="w-100 rounded-0 text-start"
          >
            {['#', name].join(' ')}
          </Button>
        </li>
      )
  );
};

const SideNavBar = ({ channels, currentChannelId }) => (
  <Col className="col-4 col-md-2 border-end d-flex flex-column p-0 bg-light">
    <div className="d-flex ps-4 pe-4 my-4 justify-content-between">
      <b>Channels</b>
      <Button
        variant=""
        className="p-0 mb-3 text-primary btn-group-vertical"
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
    <ul className="flex-column nav nav-pills nav-fill d-block h-100 overflow-auto mb-3 ">
      {
          channels && channels.map((channel) => RenderChannels(channel, currentChannelId))
        }
    </ul>
  </Col>
);

export default SideNavBar;
