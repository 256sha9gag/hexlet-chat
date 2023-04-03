import React from 'react';
import {
  Col, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { actions as currentChannelIdActions } from '../store/slice/currentChannelIdSlice';
import { actions as modalAction } from '../store/slice/modalSlice';
import { t } from 'i18next';

const RenderChannels = (channel, currentId, dispatch, translate) => {
  const { name, removable, id } = channel;
  const activeButton = id === currentId ? 'secondary' : null;

  const handleClick = (newCurrentId) => {
    dispatch(currentChannelIdActions.setCurrentChannelId(newCurrentId));
  };

  const handleModalRenameChannel = (renameChannelId) => {
    dispatch(modalAction.setModalAction('renameChannel'));
    dispatch(modalAction.setChannelId(renameChannelId));
  };

  const handleModalDeleteChannel = (removeChannelId) => {
    dispatch(modalAction.setModalAction('removeChannel'));
    dispatch(modalAction.setChannelId(removeChannelId));
  };

  return (
    !removable
      ? (
        <li className="nav-item w-100" key={id}>
          <Button
            variant={activeButton}
            onClick={() => handleClick(id)}
            className="w-100 rounded-0 text-start"
          >
            {['#', name].join(' ')}
          </Button>
        </li>
      )
      : (
        <li className="nav-item w-100 " key={id}>
          <Dropdown
            as={ButtonGroup}
            className="d-flex show"
          >
            <Button
              variant={activeButton}
              className="w-100 rounded-0 text-start text-truncate"
              onClick={() => handleClick(id)}
            >
              {['#', name].join(' ')}
            </Button>

            <Dropdown.Toggle
              split
              variant={activeButton}
              id="dropdown-split-basic"
            >
              <span className="visually-hidden">{t('sideNavbar.control')}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                eventKey="1"
                onClick={() => handleModalDeleteChannel(id)}
              >
                {translate('sideNavbar.remove')}
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2"
                onClick={() => handleModalRenameChannel(id)}
              >
                {translate('sideNavbar.rename')}

              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      )
  );
};

const SideBar = ({ channels, currentChannelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleModalAddChannel = () => {
    dispatch(modalAction.setModalAction('addChannel'));
  };

  return (
    <Col className="col-4 col-md-2 border-end d-flex flex-column p-0 bg-light h-100">
      <div className="d-flex ps-4 pe-4 my-4 justify-content-between">
        <b>{t('sideNavbar.channels')}</b>
        <Button
          variant=""
          onClick={handleModalAddChannel}
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
      <ul className="flex-column nav nav-pills nav-fill d-block h-100 overflow-auto px-2 mb-3">
        {
          channels
          && channels.map((channel) => RenderChannels(channel, currentChannelId, dispatch, t))
        }
      </ul>
    </Col>
  );
};

export default SideBar;
