import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { actions as modalActions } from '../../store/slice/modalSlice';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const GeneralModal = ({ channelsNames }) => {
  const dispatch = useDispatch();
  const { modalAction, id, isOpen } = useSelector((state) => state.modalReducer);
  const handleClose = () => dispatch(modalActions.closeModal());
  const actions = {
    addChannel: <AddChannelModal channelsNames={channelsNames} handleClose={handleClose} />,
    removeChannel: <RemoveChannelModal handleClose={handleClose} id={id} />,
    renameChannel: <RenameChannelModal
      channelsNames={channelsNames}
      handleClose={handleClose}
      id={id}
    />,
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      {actions[modalAction]}
    </Modal>
  );
};

export default GeneralModal;
